import { json } from '@tanstack/start'
import { getDB } from '~/server/db'

const PRODUCTS = [
  { sku: 'N53419974A', title: 'Relief Sun: Rice + Probiotics 50ml | SPF 50 50ml', description: 'Advanced broad spectrum UV protection with rice extracts and probiotics. SPF 50+, PA+++. Hydrating sunscreen for healthy glowing skin.', original_price: 85, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/Z6536870E2C22EBE42454Z/45/_/1783585226/9fbb1cb9-aa24-45c2-82a3-82a89f2a37cc.jpg', rating: 4.1, rating_count: 5796, in_stock: 1 },
  { sku: 'N70112172V', title: 'Relief Sun Aqua Fresh (Rice + B5) (SPF50+ PA++++) 50ml', description: 'Lightweight aqua formula with rice and B5 for hydration. SPF 50+, PA++++. Perfect for daily sun protection with a fresh finish.', original_price: 36.5, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/Z8D310195262A4FFB0490Z/45/_/1778231348/7a34d0f6-b37e-4ee2-952b-b7d3bf0740e0.jpg', rating: 4.4, rating_count: 750, in_stock: 1 },
  { sku: 'N53419978A', title: 'Dynasty Cream Facial Moisturizer for Dry, Acne-Prone, Sensitive Skin 50ml', description: 'Luxurious hydrating cream for daily hydration. Revitalizes skin, reduces fine lines, enhances elasticity. For men and women. White formula, 50ml.', original_price: 103.13, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/ZDD2B1669C54ED7A00204Z/45/_/1778230928/f559cef7-1a72-442a-adab-945d9ec0dad7.jpg', rating: 4.2, rating_count: 533, in_stock: 1 },
  { sku: 'N53420055A', title: 'Glow Deep Serum Rice Alpha-Arbutin 30ml', description: 'Dark spot discoloration correction for uneven, dull skin tone. Brightening and hydrating serum with alpha-arbutin. 30ml, 1 fl.oz.', original_price: 80, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/Z726A1B57FED6F5BB0319Z/45/_/1778230867/e088ef5b-ac1f-4fa4-83ec-5c1650b5b8f3.jpg', rating: 4.0, rating_count: 1049, in_stock: 1 },
  { sku: 'N53419981A', title: 'Glow Serum Propolis and Niacinamide 30ml', description: 'Hydrating and soothing moisturizer for irritated, uneven skin tone. Propolis and niacinamide formula. Korean skin care, 30ml.', original_price: 70, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/Z10FAB5D9CB0F72015D64Z/45/_/1778231326/f4c47628-dcea-43b0-a02c-3f2648e4286c.jpg', rating: 3.9, rating_count: 1686, in_stock: 1 },
  { sku: 'N70307483V', title: 'Pack Of 2 Relief Sun Rice + Probiotics Sunscreen 50ml', description: 'Two-pack of Relief Sun with rice and probiotics. Moisturizing sunblock with SPF 50+ PA++++. Korean skincare.', original_price: 85, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/Z4F14046AD486BB99FB09Z/45/_/1778231363/1edb474c-42dc-4bce-8135-0d91d495bf99.jpg', rating: 4.1, rating_count: 5796, in_stock: 1 },
  { sku: 'N70094273V', title: 'Glow Replenishing Rice Facial Sebum Toner 150ml', description: 'For oily, combination, acne skin. Korean moisturizing skin balance care. 5.07 fl.oz, 150ml.', original_price: 47.99, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/ZD3A878D93599E06D49BAZ/45/_/1778231364/976cd08f-29ce-44a8-8e39-d9bf36318157.jpg', rating: 4.5, rating_count: 93, in_stock: 1 },
  { sku: 'N70307484V', title: 'Pack Of 2 Relief Sun Aqua Fresh (Rice + B5) 50ml', description: 'Two-pack of Relief Sun Aqua Fresh. SPF50+ PA++++. 50ml each.', original_price: 36.5, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/ZC22A949B203B5475532CZ/45/_/1778231323/6a9087c2-73fc-484e-a30d-572c7a48686b.jpg', rating: 4.4, rating_count: 750, in_stock: 1 },
  { sku: 'N70102846V', title: 'Relief Sun: Rice + Probiotics SPF50+ PA++++', description: 'Advanced broad spectrum UV protection with skin-nourishing rice extracts and probiotics. For healthy, glowing skin. 50ml.', original_price: 49.5, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/Z298DD94FAEA3BF481DD9Z/45/_/1778230997/007c35b1-b6a8-4ea3-b96f-86986919288b.jpg', rating: 3.7, rating_count: 442, in_stock: 1 },
  { sku: 'N53420431A', title: 'Matte Sun Stick: Mugwort+Camelia 18g', description: 'Sunscreen stick for face with SPF 50 PA++++. Mugwort and camelia formula. 18 grams.', original_price: 77, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/ZCC60079C0607BD2417EBZ/45/_/1778230847/f7c8c06c-fd93-490b-aa03-a6779da42968.jpg', rating: 4.1, rating_count: 494, in_stock: 1 },
  { sku: 'N70027404V', title: 'Red Bean Refreshing Pore Mask Red 140ml', description: 'Deep cleansing and pore-minimizing face mask. Purifies skin, removes impurities, tightens pores. 140ml, 4.73 fl.oz.', original_price: 45.93, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/ZD3256B8384ECC54F636DZ/45/_/1778231233/2ecbe22f-f24e-4d2a-8025-357399ca0ba1.jpg', rating: 4.5, rating_count: 158, in_stock: 1 },
  { sku: 'N70094285V', title: 'Ground Rice and Honey Glow Mask 150ml', description: 'Exfoliating and nourishing face mask for radiant, smooth skin. Pore sebum care for dry, sensitive skin. 5.07 fl.oz.', original_price: 39.85, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/Z83D7768C122D76D17D62Z/45/_/1778231365/b711d78e-9719-4bb6-8c2e-05b965438847.jpg', rating: 4.4, rating_count: 70, in_stock: 1 },
  { sku: 'N70010541V', title: 'Light On Serum Vitamin C Centella 30ml', description: 'Dark spot, fine lines, pigmentation correcting serum. Hydrating moisturizer. 30ml, 1 fl.oz.', original_price: 43.55, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/Z2975CA83DEFB405F3D00Z/45/_/1778231055/fa47b35a-9263-4db4-8892-4b44fd17e814.jpg', rating: 4.3, rating_count: 114, in_stock: 1 },
  { sku: 'N53419976A', title: 'Ginseng Essence Water Hydrating Face Toner 150ml', description: 'Hydrating face toner for dry, dull, acne-prone, irritated skin. Korean moisturizing skin care for men and women. 5 fl.oz.', original_price: 80, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/Z8FF37FB412881F806801Z/45/_/1778231337/24c3122f-98bd-46ae-a49a-6efd92d83296.jpg', rating: 4.3, rating_count: 416, in_stock: 1 },
  { sku: 'N70276052V', title: 'Beauty of Joseon Revive Under Eye Patch Retinal Ginseng', description: 'Retinal ginseng patches for puffy under eye bags. Collagen peptide Korean skincare for women and men.', original_price: 84, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/ZC5599F29797118ACFBE5Z/45/_/1778231262/9882d8f4-ddf6-4dfd-aa11-b6e5da12a3e5.jpg', rating: 4.6, rating_count: 16, in_stock: 1 },
  { sku: 'N53420056A', title: 'Radiance Cleansing Balm Makeup, Sunscreen Pore Cleanser 100ml', description: 'Makeup and sunscreen remover, pore cleanser for sensitive, acne skin. Korean skincare for men and women. 3.38 fl.oz.', original_price: 81.47, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/ZAE4293F52EB5A84C1214Z/45/_/1778231203/29259fc0-1544-4a07-9fff-957426444ae3.jpg', rating: 4.7, rating_count: 101, in_stock: 1 },
  { sku: 'N53421312A', title: 'Apricot Blossom Peeling Gel Soft Exfoliating 100ml', description: 'Dead skin cells remover for all skin types. Soft exfoliating face and body scrub. Korean skincare for men and women. White formula.', original_price: 58, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/Z1B2901BF832150422F66Z/45/_/1778231364/6c3d76e2-fd76-40b4-9440-920334c6ced9.jpg', rating: 4.7, rating_count: 72, in_stock: 1 },
  { sku: 'N70307482V', title: 'Pack Of 2 Glow Serum Propolis and Niacinamide 30ml', description: 'Two-pack of Glow Serum. Hydrating and soothing for irritated, uneven skin tone.', original_price: 67.99, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/Z3A95437F98D1D274B95AZ/45/_/1778231008/3a37400d-b69d-4c82-b466-eaf3048e33a2.jpg', rating: 4.9, rating_count: 7, in_stock: 1 },
  { sku: 'N53421311A', title: 'Revive Serum Snail Mucin Ginseng Hydrating 30ml', description: 'Dark spot, acne scar, dull skin, fine lines correction. Hydrating repairing peptide facial moisturizer. Korean skin care.', original_price: 73.03, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/Z818D29F476EF8430E699Z/45/_/1778231366/4d597b3c-a4e3-44ea-a195-cacc5e039c40.jpg', rating: 4.2, rating_count: 232, in_stock: 1 },
  { sku: 'N70307481V', title: 'Pack Of 2 Dynasty Cream Facial Moisturizer 50ml', description: 'Two-pack of Dynasty Cream. Daily hydration Korean skincare for men and women. White, 50ml each.', original_price: 103.13, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/ZF78DE50412B233084F9DZ/45/_/1778231363/09dc9f21-57d5-4b60-a146-0348cdf05c0b.jpg', rating: 5.0, rating_count: 9, in_stock: 1 },
  { sku: 'N70102832V', title: 'Glow Serum Propolis + Niacinamide 30ml', description: 'Hydrating and soothing propolis serum. Niacinamide formula. 30ml.', original_price: 89, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/ZD392A07457F8D826CC85Z/45/_/1778231331/1b36dc49-c9ed-4a6b-ac38-b85483e44586.jpg', rating: 4.1, rating_count: 43, in_stock: 1 },
  { sku: 'N70102296V', title: 'Glow Kit & Face Scrubber Set 130ml', description: 'Radiance-boosting Glow Serum with Propolis & Niacinamide, Dynasty Cream, Sunscreen Relief Sun SPF50+ PA+++++.', original_price: 229, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/Z9A31CEE36FB3FCB22A19Z/45/_/1778231042/4fd1d873-c8df-4b78-916e-8f176c6437d8.jpg', rating: 4.4, rating_count: 36, in_stock: 1 },
  { sku: 'N70061953V', title: 'Ginseng Moist Sunscreen Serum SPF 50 PA 50ml', description: '1.69 fl.oz sunscreen serum with ginseng. SPF 50+, PA++++. Hydrating and anti-aging sun protection.', original_price: 52.99, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/Z6EFD80CFCA681ABB0AB0Z/45/_/1778231319/cac53dbc-51dd-4392-a07e-5f6301860065.jpg', rating: 4.5, rating_count: 75, in_stock: 1 },
  { sku: 'N70102436V', title: 'Ground Rice and Honey Glow Mask 150ml Variant', description: 'Exfoliating and nourishing face mask for radiant, smooth skin. 150ml.', original_price: 79, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/ZA744C716F29AEAC3DA22Z/45/_/1778231198/aaab7103-63b7-4a15-8208-dc05ab6a7026.jpg', rating: 3.8, rating_count: 60, in_stock: 1 },
  { sku: 'N70103268V', title: 'Ginseng Moist Sunscreen Serum 50ml', description: 'Hydrating and anti-aging sun protection. Lightweight, non-greasy formula. SPF 50+ PA+++++.', original_price: 68, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/Z97106721F6E13A340AC9Z/45/_/1778231340/d6e4d041-907d-4cef-90d0-be3c83ff5bd5.jpg', rating: 4.4, rating_count: 52, in_stock: 1 },
  { sku: 'N70102291V', title: 'Optimal Collection for Glowing Skin & Face Scrubber 560ml', description: 'Complete collection: Cleansing Oil, Foam, Essence Water, Revive Eye Serum, Glow Serum, Dynasty Cream, Sunscreen.', original_price: 499, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/Z66F06F5727DAA191DC89Z/45/_/1778233284/da676164-85b1-4fdd-9505-a72714501e3a.jpg', rating: 4.6, rating_count: 14, in_stock: 1 },
  { sku: 'N70103270V', title: 'Radiant Glow Pack & Face Scrubber 350ml', description: 'Ground Rice & Honey Mask, Glow Replenishing Rice Milk, Relief Sun Probiotics. Nourished, protected, radiant complexion.', original_price: 175, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/Z280F077175CB300FB228Z/45/_/1778231300/9e18a312-3534-4190-a1f6-4b4dbb31d7f6.jpg', rating: 4.5, rating_count: 24, in_stock: 1 },
  { sku: 'N70103267V', title: 'Dynasty Cream Anti-Aging and Hydrating 50ml', description: 'Luxurious anti-aging cream. Revitalizes skin, reduces fine lines, enhances elasticity for smooth, youthful complexion.', original_price: 99, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/Z4340D5685A832E6A1FE7Z/45/_/1778231063/6512d14b-b701-446a-a521-41ef04523f4b.jpg', rating: 3.9, rating_count: 51, in_stock: 1 },
  { sku: 'N70102833V', title: 'Glow Deep Serum Rice Alpha-Arbutin 30ml', description: 'Brightening and hydrating formula for even skin tone. Reduces dark spots, improves texture, enhances radiance.', original_price: 75, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/Z493DD3285F65E221B55CZ/45/_/1778231280/971f78be-2992-4b0a-99cd-4280cc809f14.jpg', rating: 4.4, rating_count: 41, in_stock: 1 },
  { sku: 'N70102842V', title: 'Red Bean Refreshing Pore Mask 140ml', description: 'Deep cleansing and pore-minimizing. Purifies skin, removes impurities, tightens pores for smooth, clear complexion.', original_price: 75, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/ZD99FB03A41B6F31065CDZ/45/_/1778231189/ad64967d-74c4-4127-b4d3-f3a74876dc06.jpg', rating: 4.5, rating_count: 44, in_stock: 1 },
  { sku: 'N70102839V', title: 'Green Plum Refreshing Toner AHA and BHA 150ml', description: 'Exfoliating and hydrating face toner. Removes dead skin, unclogs pores, balances skin. 5 fl.oz.', original_price: 42.78, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/Z7391AC57A8DB762ADAFFZ/45/_/1778231042/38a0c643-15db-40c8-8195-bc826c590295.jpg', rating: 4.4, rating_count: 17, in_stock: 1 },
  { sku: 'N70102840V', title: 'Ginseng Essence Water Hydrating 150ml', description: 'Hydrating and revitalizing face essence. Deeply nourishes, boosts elasticity, enhances radiance. 5 fl.oz.', original_price: 44.22, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/ZC64177507E11DA76401FZ/45/_/1778231279/6f500a11-9a34-4d04-bf34-b5ea7fd1d4e6.jpg', rating: 4.3, rating_count: 10, in_stock: 1 },
  { sku: 'ZF1FCE1C7AE89CB037DACZ', title: 'Glow Serum Propolis Niacinamide 30ml', description: 'Hydrating and soothing moisturizer for irritated, uneven skin tone. Korean skincare. 1 fl.oz.', original_price: 66, brand: 'Beauty Bar', image_url: 'https://f.nooncdn.com/p/pzsku/ZF1FCE1C7AE89CB037DACZ/45/1757946017/c0d7d9a9-3303-4313-9b5f-f40415c4b315.jpg', rating: 3.9, rating_count: 102, in_stock: 1 },
  { sku: 'N70060210V', title: 'Optimal Collection for Glowing Skin 560g', description: 'Cleansing Oil, Foam, Essence Water, Eye Serum, Glow Serum, Cream, Sunscreen SPF50+ PA++++', original_price: 449, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/ZCDFDB05818D96C3EAFE6Z/45/_/1778231337/5565fe64-9c63-4f5b-a28b-5d7f9d423486.jpg', rating: 4.4, rating_count: 27, in_stock: 1 },
  { sku: 'N70103266V', title: 'Red Bean Water Gel 100ml', description: 'Lightweight hydrating and soothing face gel. Calms irritation, balances oil, provides deep moisture. 3.38 fl.oz.', original_price: 75, brand: 'Beauty of Joseon', image_url: 'https://f.nooncdn.com/p/pzsku/Z7815731E0E8B7749F2BBZ/45/_/1778231409/4ad1b026-f93d-476a-8b11-8cbb52a5455e.jpg', rating: 3.8, rating_count: 31, in_stock: 1 }
]

export async function POST() {
  try {
    const supabase = await getDB()
    if (!supabase) {
      return json(
        { error: 'Database not available' },
        { status: 500 }
      )
    }

    let inserted = 0
    let errors: string[] = []

    for (const product of PRODUCTS) {
      const price = Math.round((product.original_price * 1.35 + 20) * 100) / 100

      try {
        const { error } = await supabase
          .from('products')
          .insert({
            sku: product.sku,
            title: product.title,
            description: product.description,
            price_aed: price,
            original_price_aed: product.original_price,
            image_url: product.image_url,
            rating: product.rating,
            rating_count: product.rating_count,
            in_stock: product.in_stock,
            brand: product.brand
          })

        if (error) {
          if (error.message.includes('duplicate key')) {
            continue
          }
          errors.push(`${product.sku}: ${error.message}`)
        } else {
          inserted++
        }
      } catch (err) {
        errors.push(`${product.sku}: ${String(err)}`)
      }
    }

    return json({
      success: true,
      message: `Seeded ${inserted}/${PRODUCTS.length} products`,
      inserted,
      total: PRODUCTS.length,
      errors: errors.length > 0 ? errors : undefined
    })
  } catch (error) {
    console.error('Seed error:', error)
    return json(
      { error: String(error) },
      { status: 500 }
    )
  }
}
