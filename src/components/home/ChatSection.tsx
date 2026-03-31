import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { supabase } from '@/db/supabase';
import { Loader2, Send } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // 只有当 messages 数组不为空时才滚动到底部
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

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
    <section className="w-full py-12 md:py-16 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* 标题 */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              和 Alicia 聊聊
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              有什么想问的吗？我会尽力回答你的问题 ✨
            </p>
          </div>

          {/* 聊天区域 */}
          <Card className="border-border bg-card">
            <div className="p-4 md:p-6 space-y-4">
              {/* 消息列表 */}
              <div className="space-y-4 min-h-[300px] max-h-[500px] overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-[300px] text-muted-foreground text-sm">
                    开始对话吧，我在这里等你 🦌
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] md:max-w-[70%] rounded-lg px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm md:text-base whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
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
                  className="min-h-[80px] resize-none"
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
          </Card>
        </div>
      </div>
    </section>
  );
}