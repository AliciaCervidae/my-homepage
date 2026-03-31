import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Send } from 'lucide-react';
import { supabase } from '@/db/supabase';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 发送消息
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke(
        'chat-with-alicia',
        {
          body: { message: userMessage.content },
        }
      );

      if (functionError) {
        const errorMsg = await functionError?.context?.text?.();
        console.error('Edge function 错误:', errorMsg || functionError?.message);
        throw new Error(errorMsg || '暂时联系不上 Alicia，稍后再试吧');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || '抱歉，我现在有点走神了...',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('发送消息错误:', err);
      const errorMessage = err instanceof Error ? err.message : '暂时联系不上 Alicia，稍后再试吧';
      setError(errorMessage);
      
      // 显示错误消息
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: errorMessage,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* 聊天按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 flex items-center gap-2"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageSquare className="w-5 h-5" />
        )}
        <span className="font-medium">
          {isOpen ? '关闭' : '我的数字分身！'}
        </span>
      </button>

      {/* 聊天窗口 */}
      {isOpen && (
        <div className="mt-2 w-80 md:w-96 rounded-2xl bg-card border border-border shadow-lg p-4 animate-fade-in">
          {/* 聊天标题 */}
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              和 Alicia 聊聊
            </h3>
            <p className="text-xs text-muted-foreground">
              有什么想问的吗？
            </p>
          </div>

          {/* 消息列表 */}
          <div className="space-y-4 min-h-[300px] max-h-[400px] overflow-y-auto mb-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-[200px] text-muted-foreground text-sm">
                你可以在这里问我最近在做什么、我有哪些作品、怎么联系我🦌
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 输入区域 */}
          <div className="space-y-3">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入你想说的话..."
              maxLength={200}
              disabled={isLoading}
              className="min-h-[60px] resize-none"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {input.length}/200
              </span>
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    发送中...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    发送
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}