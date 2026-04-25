import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSupabaseUpload } from '@/hooks/use-supabase-upload';
import { supabase } from '@/db/supabase';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

interface WorkUploaderProps {
  type: 'blog' | 'design' | 'art';
  onUploadSuccess?: () => void;
}

export default function WorkUploader({ type, onUploadSuccess }: WorkUploaderProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [link, setLink] = useState('');

  // 根据类型设置上传配置
  const uploadConfig = {
    bucketName: 'works',
    path: type,
    allowedMimeTypes: ['image/*'],
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 1,
    supabase
  };

  const {
    files,
    loading,
    errors,
    successes,
    isSuccess,
    getRootProps,
    getInputProps,
    onUpload
  } = useSupabaseUpload(uploadConfig);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      alert('请选择要上传的图片');
      return;
    }
    await onUpload();
    if (isSuccess && onUploadSuccess) {
      onUploadSuccess();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-border/50 bg-card rounded-3xl overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          {type === 'blog' ? '上传博客' : type === 'design' ? '上传设计' : '上传绘画'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 标题 */}
          <div className="space-y-2">
            <Label htmlFor="title">标题</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="请输入作品标题"
              required
            />
          </div>

          {/* 描述 */}
          <div className="space-y-2">
            <Label htmlFor="description">描述</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="请输入作品描述"
              required
              rows={3}
            />
          </div>

          {/* 分类 */}
          <div className="space-y-2">
            <Label htmlFor="category">分类</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="category">
                <SelectValue placeholder="请选择分类" />
              </SelectTrigger>
              <SelectContent>
                {type === 'blog' && [
                  { value: '前端', label: '前端' },
                  { value: '设计', label: '设计' },
                  { value: '其他', label: '其他' }
                ].map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
                {type === 'design' && [
                  { value: 'UI', label: 'UI' },
                  { value: 'UX', label: 'UX' },
                  { value: '平面', label: '平面' }
                ].map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
                {type === 'art' && [
                  { value: '写实', label: '写实' },
                  { value: '抽象', label: '抽象' },
                  { value: '水彩', label: '水彩' }
                ].map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 链接 */}
          <div className="space-y-2">
            <Label htmlFor="link">链接</Label>
            <Input
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="请输入作品链接"
              required
            />
          </div>

          {/* 图片上传 */}
          <div className="space-y-2">
            <Label>图片</Label>
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-border rounded-2xl p-6 text-center hover:border-primary transition-colors cursor-pointer"
            >
              <input {...getInputProps()} />
              {files.length === 0 ? (
                <p className="text-muted-foreground">点击或拖拽图片到此处上传</p>
              ) : (
                <div className="flex justify-center">
                  <img
                    src={files[0].preview}
                    alt="预览"
                    className="max-h-40 object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          {/* 错误提示 */}
          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertTitle>上传失败</AlertTitle>
              <AlertDescription>
                {errors.map((error, index) => (
                  <div key={index}>{error.message}</div>
                ))}
              </AlertDescription>
            </Alert>
          )}

          {/* 成功提示 */}
          {successes.length > 0 && (
            <Alert variant="default">
              <AlertTitle>上传成功</AlertTitle>
              <AlertDescription>
                图片已成功上传
              </AlertDescription>
            </Alert>
          )}

          {/* 提交按钮 */}
          <Button
            type="submit"
            className="w-full bg-[#B27F9E] hover:bg-[#B27F9E]/90 text-white rounded-2xl"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                上传中...
              </>
            ) : (
              '上传作品'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSupabaseUpload } from '@/hooks/use-supabase-upload';
import { supabase } from '@/db/supabase';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

interface WorkUploaderProps {
  type: 'blog' | 'design' | 'art';
  onUploadSuccess?: () => void;
}

export default function WorkUploader({ type, onUploadSuccess }: WorkUploaderProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [link, setLink] = useState('');

  // 根据类型设置上传配置
  const uploadConfig = {
    bucketName: 'works',
    path: type,
    allowedMimeTypes: ['image/*'],
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 1,
    supabase
  };

  const {
    files,
    loading,
    errors,
    successes,
    isSuccess,
    getRootProps,
    getInputProps,
    onUpload
  } = useSupabaseUpload(uploadConfig);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      alert('请选择要上传的图片');
      return;
    }
    await onUpload();
    if (isSuccess && onUploadSuccess) {
      onUploadSuccess();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-border/50 bg-card rounded-3xl overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          {type === 'blog' ? '上传博客文章' : type === 'design' ? '上传设计作品' : '上传绘画作品'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 标题 */}
          <div className="space-y-2">
            <Label htmlFor="title">标题</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="请输入作品标题"
              required
            />
          </div>

          {/* 描述 */}
          <div className="space-y-2">
            <Label htmlFor="description">描述</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="请输入作品描述"
              required
              rows={3}
            />
          </div>

          {/* 分类 */}
          <div className="space-y-2">
            <Label htmlFor="category">分类</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="category">
                <SelectValue placeholder="请选择分类" />
              </SelectTrigger>
              <SelectContent>
                {type === 'blog' && [
                  { value: '前端', label: '前端' },
                  { value: '设计', label: '设计' },
                  { value: '其他', label: '其他' }
                ].map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
                {type === 'design' && [
                  { value: 'UI', label: 'UI' },
                  { value: 'UX', label: 'UX' },
                  { value: '平面', label: '平面' }
                ].map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
                {type === 'art' && [
                  { value: '写实', label: '写实' },
                  { value: '抽象', label: '抽象' },
                  { value: '水彩', label: '水彩' }
                ].map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 链接 */}
          <div className="space-y-2">
            <Label htmlFor="link">链接</Label>
            <Input
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="请输入作品链接"
              required
            />
          </div>

          {/* 图片上传 */}
          <div className="space-y-2">
            <Label>图片</Label>
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-border rounded-2xl p-6 text-center hover:border-primary transition-colors cursor-pointer"
            >
              <input {...getInputProps()} />
              {files.length === 0 ? (
                <p className="text-muted-foreground">点击或拖拽图片到此处上传</p>
              ) : (
                <div className="flex justify-center">
                  <img
                    src={files[0].preview}
                    alt="预览"
                    className="max-h-40 object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          {/* 错误提示 */}
          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertTitle>上传失败</AlertTitle>
              <AlertDescription>
                {errors.map((error, index) => (
                  <div key={index}>{error.message}</div>
                ))}
              </AlertDescription>
            </Alert>
          )}

          {/* 成功提示 */}
          {successes.length > 0 && (
            <Alert variant="default">
              <AlertTitle>上传成功</AlertTitle>
              <AlertDescription>
                图片已成功上传
              </AlertDescription>
            </Alert>
          )}

          {/* 提交按钮 */}
          <Button
            type="submit"
            className="w-full bg-[#B27F9E] hover:bg-[#B27F9E]/90 text-white rounded-2xl"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                上传中...
              </>
            ) : (
              '上传作品'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}