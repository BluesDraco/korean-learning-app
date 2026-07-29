/**
 * 场景预习内容注册中心。
 *
 * 每个场景 preview 一个文件（{slug}.ts），在这里 slug→preview 映射。
 * 没填内容的骨架文件导出 undefined —— getScenePreview 会返回 undefined，
 * UI 层判定为「无预习」直接跳到 AI 对话。
 */
import type { ScenePreview } from '../sceneLocations';

import { haruCafePreview } from './haru-cafe';

// 骨架（待填充，导出 undefined）
import { incheonAirportPreview } from './incheon-airport';
import { subwayStationPreview } from './subway-station';
import { busTerminalPreview } from './bus-terminal';
import { suulStationPreview } from './suul-station';
import { cuMartPreview } from './cu-mart';
import { hanbitDormPreview } from './hanbit-dorm';
import { bakeryPreview } from './bakery';
import { hongkongStreetPreview } from './hongkong-street';
import { pawsMallPreview } from './paws-mall';
import { daisoPreview } from './daiso';
import { stationeryPreview } from './stationery';
import { hanbitClassroomPreview } from './hanbit-classroom';
import { libraryPreview } from './library';
import { examHallPreview } from './exam-hall';
import { schoolCanteenPreview } from './school-canteen';
import { saminBankPreview } from './samin-bank';
import { pharmacyPreview } from './pharmacy';
import { hospitalPreview } from './hospital';
import { realEstatePreview } from './real-estate';
import { cultureParkPreview } from './culture-park';
import { fansignCafePreview } from './fansign-cafe';
import { cinemaPreview } from './cinema';
import { karaokePreview } from './karaoke';
import { centralParkPreview } from './central-park';
import { cityHallPreview } from './city-hall';
import { predatorStreetPreview } from './predator-street';
import { predatorStorePreview } from './predator-store';
import { predatorBarPreview } from './predator-bar';
import { animalMarketPreview } from './animal-market';
import { supermarketPreview } from './supermarket';
import { bbqHousePreview } from './bbq-house';
import { friedChickenPreview } from './fried-chicken';
import { undergroundMallPreview } from './underground-mall';
import { bookstore24hPreview } from './bookstore-24h';

const PREVIEW_MAP: Record<string, ScenePreview | undefined> = {
  'haru-cafe': haruCafePreview,
  'incheon-airport': incheonAirportPreview,
  'subway-station': subwayStationPreview,
  'bus-terminal': busTerminalPreview,
  'suul-station': suulStationPreview,
  'cu-mart': cuMartPreview,
  'hanbit-dorm': hanbitDormPreview,
  'bakery': bakeryPreview,
  'hongkong-street': hongkongStreetPreview,
  'paws-mall': pawsMallPreview,
  'daiso': daisoPreview,
  'stationery': stationeryPreview,
  'hanbit-classroom': hanbitClassroomPreview,
  'library': libraryPreview,
  'exam-hall': examHallPreview,
  'school-canteen': schoolCanteenPreview,
  'samin-bank': saminBankPreview,
  'pharmacy': pharmacyPreview,
  'hospital': hospitalPreview,
  'real-estate': realEstatePreview,
  'culture-park': cultureParkPreview,
  'fansign-cafe': fansignCafePreview,
  'cinema': cinemaPreview,
  'karaoke': karaokePreview,
  'central-park': centralParkPreview,
  'city-hall': cityHallPreview,
  'predator-street': predatorStreetPreview,
  'predator-store': predatorStorePreview,
  'predator-bar': predatorBarPreview,
  'animal-market': animalMarketPreview,
  'supermarket': supermarketPreview,
  'bbq-house': bbqHousePreview,
  'fried-chicken': friedChickenPreview,
  'underground-mall': undergroundMallPreview,
  'bookstore-24h': bookstore24hPreview,
};

export function getScenePreview(slug: string): ScenePreview | undefined {
  return PREVIEW_MAP[slug];
}
