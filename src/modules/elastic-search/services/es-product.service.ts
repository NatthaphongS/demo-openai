import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ProductVariantSearchModel } from 'src/modules/products/dto/product-variant-search-model.dto';
import { OpenAiService } from 'src/modules/shared/openai/openai.service';

@Injectable()
export class ESProductService {
  private readonly indexName = 'products';

  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly openAiService: OpenAiService,
  ) {}

  async createIndex(): Promise<any> {
    try {
      // 1️⃣ DELETE EXISTING INDEX IF EXISTS
      const indexExists = await this.elasticsearchService.indices.exists({
        index: this.indexName,
      });

      if (indexExists) {
        await this.elasticsearchService.indices.delete({
          index: this.indexName,
        });
        console.log(`✅ Deleted existing index: ${this.indexName}`);
      }

      // 2️⃣ CREATE NEW INDEX WITH MAPPINGS
      const response = await this.elasticsearchService.indices.create({
        index: this.indexName,
        body: {
          settings: {
            number_of_shards: 3,
            number_of_replicas: 1,
          },
          mappings: {
            properties: {
              name: {
                type: 'text',
              },
              description: {
                type: 'text',
              },
              vector: {
                type: 'dense_vector',
                dims: 1536, // ✅ Set to match OpenAI embeddings
                index: false, // ✅ You can still use script_score search
                // similarity: 'cosine', // ✅ Required when indexing
              },
              category: {
                type: 'keyword', // Useful for filtering
              },
              price: {
                type: 'float',
              },
            },
          },
        },
      });

      console.log(`✅ Created index: ${this.indexName}`);
      return response;
    } catch (error) {
      console.error(`❌ Error creating index:`, error);
      throw error;
    }
  }

  async searchProduct(query: string) {
    const queryEmbedding = await this.openAiService.generateEmbedding(query);
    try {
      const result = await this.elasticsearchService.search({
        index: this.indexName,
        body: {
          size: 5,
          _source: { excludes: ['vector', 'imageUrl'] },
          // min_score: 1.75,
          query: {
            bool: {
              should: [
                {
                  script_score: {
                    query: { match_all: {} }, // Include all products
                    script: {
                      source:
                        "cosineSimilarity(params.query_vector, 'vector') * 3.0 + 1.0",
                      params: { query_vector: queryEmbedding },
                    },
                  },
                },
                {
                  multi_match: {
                    query: query,
                    fields: [
                      'productName^5', // 🔥 Highest priority
                      'productVariantName^5', // 🔥 Highest priority
                      'brand^5',
                      'barcode^5',
                      'category^4',
                      'categoryCode^4',
                      'productTags^4',
                      'dimensions^3',
                      'productVariantDescription^2',
                      'feature^2',
                      'model^1',
                      'series^1',
                      'material^1',
                    ],
                    type: 'most_fields',
                  },
                },
              ],
              minimum_should_match: 1, // At least one condition should match
            },
          },
        },
      });

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addProductToIndex(productData: ProductVariantSearchModel) {
    try {
      // 🟢 Combine all relevant attributes into a single text
      // const combinedText = [
      //   `Product Name: ${product.name}`,
      //   product.brand ? `Brand: ${product.brand}` : '',
      //   product.category ? `Category: ${product.category}` : '',
      //   product.material ? `Material: ${product.material}` : '',
      //   product.features ? `Features: ${product.features}` : '',
      //   product.description ? `Description: ${product.description}` : '',
      // ]
      //   .filter(Boolean)
      //   .join(' | '); // Remove empty values and join with '|'
      const combinedText = `
                              Product Name: ${productData.productName}
                              Product Variant Name: ${productData.productVariantName}
                              Description: ${productData.productVariantDescription}
                              Brand: ${productData.brand}
                              Series: ${productData.series}
                              Model: ${productData.model}
                              Dimensions: ${productData.dimensions.join(', ')}
                              Tags: ${productData.productTags}
                              Category: ${productData.category}
                              Features: ${productData.feature.join(', ')}
                              Material: ${productData.material}
                          `.trim();

      // 🟢 Generate Embedding
      const embedding =
        await this.openAiService.generateEmbedding(combinedText);

      // 🟢 Store in Elasticsearch
      await this.elasticsearchService.index({
        index: 'products',
        body: {
          ...productData,
          vector: embedding, // Must be stored as an array of numbers
        },
      });

      console.log(`Complete add product ${productData.productVariantName}`);
      return { success: true };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

// async searchProduct(query: string) {
//   const queryEmbedding = await this.openAiService.generateEmbedding(query);

//   // 🟢 List of keywords to boost
//   const keywordBoostList = ["ปูนซีเมนต์", "เหล็กเส้น", "สีทาบ้าน", "ไม้แบบก่อสร้าง"];

//   try {
//       const result = await this.elasticsearchService.search({
//           index: this.indexName,
//           body: {
//               size: 10,
//               _source: { excludes: ['vector'] },  // ✅ Remove vector field from response
//               min_score: 1.5,  // ✅ Remove low-scoring matches
//               query: {
//                   function_score: {
//                       query: {
//                           bool: {
//                               should: [
//                                   // ✅ 1. Vector Similarity Search
//                                   {
//                                       script_score: {
//                                           query: { match_all: {} },
//                                           script: {
//                                               source: "cosineSimilarity(params.query_vector, 'vector') * 3.0 + 1.0",
//                                               params: { query_vector: queryEmbedding }
//                                           }
//                                       }
//                                   },
//                                   // ✅ 2. Text Matching for Normal Keyword Search
//                                   {
//                                       multi_match: {
//                                           query: query,
//                                           fields: ['name^3', 'description^2', 'category^1'],
//                                           type: 'most_fields'
//                                       }
//                                   },
//                                   // ✅ 3. Boost Products Containing Important Keywords
//                                   {
//                                       terms: {
//                                           name: keywordBoostList,  // 🔥 Boost all products matching keywords
//                                           boost: 5  // 🔥 High boost for keyword match
//                                       }
//                                   }
//                               ],
//                               minimum_should_match: 1  // ✅ Ensure at least one condition matches
//                           }
//                       },
//                       boost_mode: "sum",  // ✅ Combine vector + text + keyword scores
//                       functions: [
//                           // ✅ Boost Newer Products
//                           {
//                               gauss: {
//                                   created_at: {
//                                       origin: "now",
//                                       scale: "30d",
//                                       decay: 0.5
//                                   }
//                               }
//                           },
//                           // ✅ Boost Popular Products
//                           {
//                               field_value_factor: {
//                                   field: "popularity",
//                                   factor: 2.0,
//                                   modifier: "log1p"
//                               }
//                           }
//                       ]
//                   }
//               }
//           }
//       });

//       return result.body.hits.hits.map(hit => hit._source);  // ✅ Return only necessary fields
//   } catch (error) {
//       console.error(`❌ Error in searchProduct:`, error);
//       throw error;
//   }
// }
