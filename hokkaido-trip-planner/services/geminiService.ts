import { AttractionDetailsResponse } from '../types';
import { ATTRACTIONS } from '../constants';

// 此服務已改為不需 API Key 的模擬模式
// The service has been modified to a mock mode that does not require an API Key.

export const getAttractionDetails = async (attractionName: string, location: string): Promise<AttractionDetailsResponse> => {
  // 模擬網路延遲，讓體驗更自然
  // Simulate network delay for a more natural experience
  await new Promise(resolve => setTimeout(resolve, 800));

  // 嘗試從靜態資料中尋找對應的景點描述，以提供相關內容
  const foundAttraction = Object.values(ATTRACTIONS).find(a => a.name === attractionName);
  
  const baseDesc = foundAttraction?.description || `位於${location}的絕佳景點`;

  return {
    description: `${baseDesc}。這裡深受遊客喜愛，不僅景色優美，更充滿了北海道獨特的氛圍。無論是單純觀光還是深入體驗當地文化，這裡都是不容錯過的選擇。`,
    tips: "1. 建議盡量避開人潮高峰時段（通常為中午至下午2點），以獲得更好的參觀品質。\n2. 附近通常有不錯的在地小吃或紀念品店，建議預留額外時間探索。\n3. 拍照時請留意光線，日落前的黃金時刻通常最美。",
    weatherAdvice: "北海道四季分明且日夜溫差大。建議採用洋蔥式穿法（多層次穿搭），方便隨時穿脫。若為冬季前往，請務必準備防滑鞋、防風外套、圍巾與手套，以抵禦嚴寒與積雪。"
  };
};