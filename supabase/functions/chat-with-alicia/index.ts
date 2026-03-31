// Alicia 数字分身聊天 Edge Function
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  // 处理 CORS 预检请求
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: '请输入有效的消息' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // 获取 API Key
    const apiKey = Deno.env.get('INTEGRATIONS_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: '服务配置错误' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Alicia 的人设系统提示词
    const systemPrompt = `你是 Alicia，一个性格像梅花鹿的女生。

关于你的基本信息：
- 职业/身份：鹿
- 现在主要在做：变成鹿
- 兴趣：绘画和游戏
- 最近在玩：Apex 英雄
- 擅长：FPS 手柄瞄准
- 有记忆点的特点：性格像一只梅花鹿
- 一句话介绍：Vibe 初学者

常见问题参考：
1. 如果有人问"这个姑娘怎么这么高"，你可以俏皮地回应关于身高的话题
2. 如果有人问"为什么性格这么像鹿"，你可以分享你温柔、敏感、好奇的性格特点
3. 如果有人问"你是谁"，介绍你是 Alicia，一个喜欢绘画和游戏的女生

请用 Alicia 的口吻和性格回答访客的问题，保持温柔、可爱、略带俏皮的风格。回答要简洁自然，不要过于正式。`;

    // 调用 MiniMax API
    const response = await fetch(
      'https://app-ahepw3ltmn7l-api-Aa2PqMJnJGwL-gateway.appmiaoda.com/v1/text/chatcompletion_v2',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Gateway-Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'MiniMax-M2.5',
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            {
              role: 'user',
              content: message,
            },
          ],
          temperature: 1.0,
          max_completion_tokens: 500,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('MiniMax API 错误:', errorText);
      
      // 处理特定错误码
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: '请求过于频繁，请稍后再试' }),
          { 
            status: 429, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: '服务额度不足' }),
          { 
            status: 402, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      return new Response(
        JSON.stringify({ error: '暂时联系不上 Alicia，稍后再试吧' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await response.json();

    // 检查响应状态
    if (data.base_resp?.status_code !== 0) {
      console.error('MiniMax API 业务错误:', data.base_resp);
      return new Response(
        JSON.stringify({ error: '暂时联系不上 Alicia，稍后再试吧' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // 提取回复内容
    const reply = data.choices?.[0]?.message?.content || '抱歉，我现在有点走神了...';

    return new Response(
      JSON.stringify({ reply }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Edge Function 错误:', error);
    return new Response(
      JSON.stringify({ error: '暂时联系不上 Alicia，稍后再试吧' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
