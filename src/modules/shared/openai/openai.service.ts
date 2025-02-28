import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai.embeddings;
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const response = await this.openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    return response.data[0].embedding;
  }

  async findBrandInSearchQuery(query: string): Promise<string | null> {
    // query will like "ถังน้ำดอส"
    // need open ai find brand in query
    // return brand name
    const prompt = `Find on predict the brand name from the following search query: "${query}" just return only word of brand. If not brand return null`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini', // Or use another model that fits the task
        messages: [
          // { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 50,
        temperature: 0, // Lower temperature for deterministic responses
      });

      const brand = response.choices[0].message.content;
      return brand === 'None' ? null : brand;
    } catch (error) {
      console.error('Error identifying brand:', error);
      return null;
    }
  }
}
