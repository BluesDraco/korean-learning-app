import type { ToriLevel } from '@/types/tori-diary';
import type {
  ToriSubQuestIdx,
  VocabSubQuestData, ListenSubQuestData, GrammarSubQuestData,
  SceneSubQuestData, BossSubQuestData, AnySubQuestData,
} from '@/types/tori-subquest';
import { day1Vocab } from './day-1-vocab';
import { day1Listen } from './day-1-listen';
import { day1Grammar } from './day-1-grammar';
import { day1Scene } from './day-1-scene';
import { day1Boss } from './day-1-boss';
import { day2Vocab } from './day-2-vocab';
import { day2Listen } from './day-2-listen';
import { day2Grammar } from './day-2-grammar';
import { day2Scene } from './day-2-scene';
import { day2Boss } from './day-2-boss';
import { day3Vocab } from './day-3-vocab';
import { day3Listen } from './day-3-listen';
import { day3Grammar } from './day-3-grammar';
import { day3Scene } from './day-3-scene';
import { day3Boss } from './day-3-boss';
import { day4Vocab } from './day-4-vocab';
import { day4Listen } from './day-4-listen';
import { day4Grammar } from './day-4-grammar';
import { day4Scene } from './day-4-scene';
import { day4Boss } from './day-4-boss';
import { day5Vocab } from './day-5-vocab';
import { day5Listen } from './day-5-listen';
import { day5Grammar } from './day-5-grammar';
import { day5Scene } from './day-5-scene';
import { day5Boss } from './day-5-boss';
import { day6Vocab } from './day-6-vocab';
import { day6Listen } from './day-6-listen';
import { day6Grammar } from './day-6-grammar';
import { day6Scene } from './day-6-scene';
import { day6Boss } from './day-6-boss';
import { day7Vocab } from './day-7-vocab';
import { day7Listen } from './day-7-listen';
import { day7Grammar } from './day-7-grammar';
import { day7Scene } from './day-7-scene';
import { day7Boss } from './day-7-boss';
import { day8Vocab } from './day-8-vocab';
import { day8Listen } from './day-8-listen';
import { day8Grammar } from './day-8-grammar';
import { day8Scene } from './day-8-scene';
import { day8Boss } from './day-8-boss';
import { day9Vocab } from './day-9-vocab';
import { day9Listen } from './day-9-listen';
import { day9Grammar } from './day-9-grammar';
import { day9Scene } from './day-9-scene';
import { day9Boss } from './day-9-boss';
import { day10Vocab } from './day-10-vocab';
import { day10Listen } from './day-10-listen';
import { day10Grammar } from './day-10-grammar';
import { day10Scene } from './day-10-scene';
import { day10Boss } from './day-10-boss';
import { day11Vocab } from './day-11-vocab';
import { day11Listen } from './day-11-listen';
import { day11Grammar } from './day-11-grammar';
import { day11Scene } from './day-11-scene';
import { day11Boss } from './day-11-boss';
import { day12Vocab } from './day-12-vocab';
import { day12Listen } from './day-12-listen';
import { day12Grammar } from './day-12-grammar';
import { day12Scene } from './day-12-scene';
import { day12Boss } from './day-12-boss';
import { day13Vocab } from './day-13-vocab';
import { day13Listen } from './day-13-listen';
import { day13Grammar } from './day-13-grammar';
import { day13Scene } from './day-13-scene';
import { day13Boss } from './day-13-boss';
import { day14Vocab } from './day-14-vocab';
import { day14Listen } from './day-14-listen';
import { day14Grammar } from './day-14-grammar';
import { day14Scene } from './day-14-scene';
import { day14Boss } from './day-14-boss';
import { day15Vocab } from './day-15-vocab';
import { day15Listen } from './day-15-listen';
import { day15Grammar } from './day-15-grammar';
import { day15Scene } from './day-15-scene';
import { day15Boss } from './day-15-boss';
import { day16Vocab } from './day-16-vocab';
import { day16Listen } from './day-16-listen';
import { day16Grammar } from './day-16-grammar';
import { day16Scene } from './day-16-scene';
import { day16Boss } from './day-16-boss';
import { day17Vocab } from './day-17-vocab';
import { day17Listen } from './day-17-listen';
import { day17Grammar } from './day-17-grammar';
import { day17Scene } from './day-17-scene';
import { day17Boss } from './day-17-boss';
import { day18Vocab } from './day-18-vocab';
import { day18Listen } from './day-18-listen';
import { day18Grammar } from './day-18-grammar';
import { day18Scene } from './day-18-scene';
import { day18Boss } from './day-18-boss';
import { day19Vocab } from './day-19-vocab';
import { day19Listen } from './day-19-listen';
import { day19Grammar } from './day-19-grammar';
import { day19Scene } from './day-19-scene';
import { day19Boss } from './day-19-boss';
import { day20Vocab } from './day-20-vocab';
import { day20Listen } from './day-20-listen';
import { day20Grammar } from './day-20-grammar';
import { day20Scene } from './day-20-scene';
import { day20Boss } from './day-20-boss';
import { day21Vocab } from './day-21-vocab';
import { day21Listen } from './day-21-listen';
import { day21Grammar } from './day-21-grammar';
import { day21Scene } from './day-21-scene';
import { day21Boss } from './day-21-boss';
import { day22Vocab } from './day-22-vocab';
import { day22Listen } from './day-22-listen';
import { day22Grammar } from './day-22-grammar';
import { day22Scene } from './day-22-scene';
import { day22Boss } from './day-22-boss';
import { day23Vocab } from './day-23-vocab';
import { day23Listen } from './day-23-listen';
import { day23Grammar } from './day-23-grammar';
import { day23Scene } from './day-23-scene';
import { day23Boss } from './day-23-boss';
import { day24Vocab } from './day-24-vocab';
import { day24Listen } from './day-24-listen';
import { day24Grammar } from './day-24-grammar';
import { day24Scene } from './day-24-scene';
import { day24Boss } from './day-24-boss';
import { day25Vocab } from './day-25-vocab';
import { day25Listen } from './day-25-listen';
import { day25Grammar } from './day-25-grammar';
import { day25Scene } from './day-25-scene';
import { day25Boss } from './day-25-boss';
import { day26Vocab } from './day-26-vocab';
import { day26Listen } from './day-26-listen';
import { day26Grammar } from './day-26-grammar';
import { day26Scene } from './day-26-scene';
import { day26Boss } from './day-26-boss';
import { day27Vocab } from './day-27-vocab';
import { day27Listen } from './day-27-listen';
import { day27Grammar } from './day-27-grammar';
import { day27Scene } from './day-27-scene';
import { day27Boss } from './day-27-boss';
import { day28Vocab } from './day-28-vocab';
import { day28Listen } from './day-28-listen';
import { day28Grammar } from './day-28-grammar';
import { day28Scene } from './day-28-scene';
import { day28Boss } from './day-28-boss';
import { day29Vocab } from './day-29-vocab';
import { day29Listen } from './day-29-listen';
import { day29Grammar } from './day-29-grammar';
import { day29Scene } from './day-29-scene';
import { day29Boss } from './day-29-boss';
import { day30Vocab } from './day-30-vocab';
import { day30Listen } from './day-30-listen';
import { day30Grammar } from './day-30-grammar';
import { day30Scene } from './day-30-scene';
import { day30Boss } from './day-30-boss';
import { day31Vocab } from './day-31-vocab';
import { day31Listen } from './day-31-listen';
import { day31Grammar } from './day-31-grammar';
import { day31Scene } from './day-31-scene';
import { day31Boss } from './day-31-boss';
import { day32Vocab } from './day-32-vocab';
import { day32Listen } from './day-32-listen';
import { day32Grammar } from './day-32-grammar';
import { day32Scene } from './day-32-scene';
import { day32Boss } from './day-32-boss';
import { day33Vocab } from './day-33-vocab';
import { day33Listen } from './day-33-listen';
import { day33Grammar } from './day-33-grammar';
import { day33Scene } from './day-33-scene';
import { day33Boss } from './day-33-boss';
import { day34Vocab } from './day-34-vocab';
import { day34Listen } from './day-34-listen';
import { day34Grammar } from './day-34-grammar';
import { day34Scene } from './day-34-scene';
import { day34Boss } from './day-34-boss';
import { day35Vocab } from './day-35-vocab';
import { day35Listen } from './day-35-listen';
import { day35Grammar } from './day-35-grammar';
import { day35Scene } from './day-35-scene';
import { day35Boss } from './day-35-boss';
import { day36Vocab } from './day-36-vocab';
import { day36Listen } from './day-36-listen';
import { day36Grammar } from './day-36-grammar';
import { day36Scene } from './day-36-scene';
import { day36Boss } from './day-36-boss';
import { day37Vocab } from './day-37-vocab';
import { day37Listen } from './day-37-listen';
import { day37Grammar } from './day-37-grammar';
import { day37Scene } from './day-37-scene';
import { day37Boss } from './day-37-boss';
import { day38Vocab } from './day-38-vocab';
import { day38Listen } from './day-38-listen';
import { day38Grammar } from './day-38-grammar';
import { day38Scene } from './day-38-scene';
import { day38Boss } from './day-38-boss';
import { day39Vocab } from './day-39-vocab';
import { day39Listen } from './day-39-listen';
import { day39Grammar } from './day-39-grammar';
import { day39Scene } from './day-39-scene';
import { day39Boss } from './day-39-boss';
import { day40Vocab } from './day-40-vocab';
import { day40Listen } from './day-40-listen';
import { day40Grammar } from './day-40-grammar';
import { day40Scene } from './day-40-scene';
import { day40Boss } from './day-40-boss';
import { day41Vocab } from './day-41-vocab';
import { day41Listen } from './day-41-listen';
import { day41Grammar } from './day-41-grammar';
import { day41Scene } from './day-41-scene';
import { day41Boss } from './day-41-boss';
import { day42Vocab } from './day-42-vocab';
import { day42Listen } from './day-42-listen';
import { day42Grammar } from './day-42-grammar';
import { day42Scene } from './day-42-scene';
import { day42Boss } from './day-42-boss';
import { day43Vocab } from './day-43-vocab';
import { day43Listen } from './day-43-listen';
import { day43Grammar } from './day-43-grammar';
import { day43Scene } from './day-43-scene';
import { day43Boss } from './day-43-boss';
import { day44Vocab } from './day-44-vocab';
import { day44Listen } from './day-44-listen';
import { day44Grammar } from './day-44-grammar';
import { day44Scene } from './day-44-scene';
import { day44Boss } from './day-44-boss';
import { day45Vocab } from './day-45-vocab';
import { day45Listen } from './day-45-listen';
import { day45Grammar } from './day-45-grammar';
import { day45Scene } from './day-45-scene';
import { day45Boss } from './day-45-boss';
import { day46Vocab } from './day-46-vocab';
import { day46Listen } from './day-46-listen';
import { day46Grammar } from './day-46-grammar';
import { day46Scene } from './day-46-scene';
import { day46Boss } from './day-46-boss';
import { day47Vocab } from './day-47-vocab';
import { day47Listen } from './day-47-listen';
import { day47Grammar } from './day-47-grammar';
import { day47Scene } from './day-47-scene';
import { day47Boss } from './day-47-boss';
import { day48Vocab } from './day-48-vocab';
import { day48Listen } from './day-48-listen';
import { day48Grammar } from './day-48-grammar';
import { day48Scene } from './day-48-scene';
import { day48Boss } from './day-48-boss';
import { day49Vocab } from './day-49-vocab';
import { day49Listen } from './day-49-listen';
import { day49Grammar } from './day-49-grammar';
import { day49Scene } from './day-49-scene';
import { day49Boss } from './day-49-boss';
import { day50Vocab } from './day-50-vocab';
import { day50Listen } from './day-50-listen';
import { day50Grammar } from './day-50-grammar';
import { day50Scene } from './day-50-scene';
import { day50Boss } from './day-50-boss';
import { day51Vocab } from './day-51-vocab';
import { day51Listen } from './day-51-listen';
import { day51Grammar } from './day-51-grammar';
import { day51Scene } from './day-51-scene';
import { day51Boss } from './day-51-boss';
import { day52Vocab } from './day-52-vocab';
import { day52Listen } from './day-52-listen';
import { day52Grammar } from './day-52-grammar';
import { day52Scene } from './day-52-scene';
import { day52Boss } from './day-52-boss';
import { day53Vocab } from './day-53-vocab';
import { day53Listen } from './day-53-listen';
import { day53Grammar } from './day-53-grammar';
import { day53Scene } from './day-53-scene';
import { day53Boss } from './day-53-boss';
import { day54Vocab } from './day-54-vocab';
import { day54Listen } from './day-54-listen';
import { day54Grammar } from './day-54-grammar';
import { day54Scene } from './day-54-scene';
import { day54Boss } from './day-54-boss';
import { day55Vocab } from './day-55-vocab';
import { day55Listen } from './day-55-listen';
import { day55Grammar } from './day-55-grammar';
import { day55Scene } from './day-55-scene';
import { day55Boss } from './day-55-boss';
import { day56Vocab } from './day-56-vocab';
import { day56Listen } from './day-56-listen';
import { day56Grammar } from './day-56-grammar';
import { day56Scene } from './day-56-scene';
import { day56Boss } from './day-56-boss';
import { day57Vocab } from './day-57-vocab';
import { day57Listen } from './day-57-listen';
import { day57Grammar } from './day-57-grammar';
import { day57Scene } from './day-57-scene';
import { day57Boss } from './day-57-boss';
import { day58Vocab } from './day-58-vocab';
import { day58Listen } from './day-58-listen';
import { day58Grammar } from './day-58-grammar';
import { day58Scene } from './day-58-scene';
import { day58Boss } from './day-58-boss';
import { day59Vocab } from './day-59-vocab';
import { day59Listen } from './day-59-listen';
import { day59Grammar } from './day-59-grammar';
import { day59Scene } from './day-59-scene';
import { day59Boss } from './day-59-boss';
import { day60Vocab } from './day-60-vocab';
import { day60Listen } from './day-60-listen';
import { day60Grammar } from './day-60-grammar';
import { day60Scene } from './day-60-scene';
import { day60Boss } from './day-60-boss';
import { day61Vocab } from './day-61-vocab';
import { day61Listen } from './day-61-listen';
import { day61Grammar } from './day-61-grammar';
import { day61Scene } from './day-61-scene';
import { day61Boss } from './day-61-boss';
import { day62Vocab } from './day-62-vocab';
import { day62Listen } from './day-62-listen';
import { day62Grammar } from './day-62-grammar';
import { day62Scene } from './day-62-scene';
import { day62Boss } from './day-62-boss';
import { day63Vocab } from './day-63-vocab';
import { day63Listen } from './day-63-listen';
import { day63Grammar } from './day-63-grammar';
import { day63Scene } from './day-63-scene';
import { day63Boss } from './day-63-boss';
import { day64Vocab } from './day-64-vocab';
import { day64Listen } from './day-64-listen';
import { day64Grammar } from './day-64-grammar';
import { day64Scene } from './day-64-scene';
import { day64Boss } from './day-64-boss';
import { day65Vocab } from './day-65-vocab';
import { day65Listen } from './day-65-listen';
import { day65Grammar } from './day-65-grammar';
import { day65Scene } from './day-65-scene';
import { day65Boss } from './day-65-boss';
import { day66Vocab } from './day-66-vocab';
import { day66Listen } from './day-66-listen';
import { day66Grammar } from './day-66-grammar';
import { day66Scene } from './day-66-scene';
import { day66Boss } from './day-66-boss';
import { day67Vocab } from './day-67-vocab';
import { day67Listen } from './day-67-listen';
import { day67Grammar } from './day-67-grammar';
import { day67Scene } from './day-67-scene';
import { day67Boss } from './day-67-boss';
import { day68Vocab } from './day-68-vocab';
import { day68Listen } from './day-68-listen';
import { day68Grammar } from './day-68-grammar';
import { day68Scene } from './day-68-scene';
import { day68Boss } from './day-68-boss';
import { day69Vocab } from './day-69-vocab';
import { day69Listen } from './day-69-listen';
import { day69Grammar } from './day-69-grammar';
import { day69Scene } from './day-69-scene';
import { day69Boss } from './day-69-boss';
import { day70Vocab } from './day-70-vocab';
import { day70Listen } from './day-70-listen';
import { day70Grammar } from './day-70-grammar';
import { day70Scene } from './day-70-scene';
import { day70Boss } from './day-70-boss';
import { day71Vocab } from './day-71-vocab';
import { day71Listen } from './day-71-listen';
import { day71Grammar } from './day-71-grammar';
import { day71Scene } from './day-71-scene';
import { day71Boss } from './day-71-boss';
import { day72Vocab } from './day-72-vocab';
import { day72Listen } from './day-72-listen';
import { day72Grammar } from './day-72-grammar';
import { day72Scene } from './day-72-scene';
import { day72Boss } from './day-72-boss';
import { day73Vocab } from './day-73-vocab';
import { day73Listen } from './day-73-listen';
import { day73Grammar } from './day-73-grammar';
import { day73Scene } from './day-73-scene';
import { day73Boss } from './day-73-boss';
import { day74Vocab } from './day-74-vocab';
import { day74Listen } from './day-74-listen';
import { day74Grammar } from './day-74-grammar';
import { day74Scene } from './day-74-scene';
import { day74Boss } from './day-74-boss';
import { day75Vocab } from './day-75-vocab';
import { day75Listen } from './day-75-listen';
import { day75Grammar } from './day-75-grammar';
import { day75Scene } from './day-75-scene';
import { day75Boss } from './day-75-boss';
import { day76Vocab } from './day-76-vocab';
import { day76Listen } from './day-76-listen';
import { day76Grammar } from './day-76-grammar';
import { day76Scene } from './day-76-scene';
import { day76Boss } from './day-76-boss';
import { day77Vocab } from './day-77-vocab';
import { day77Listen } from './day-77-listen';
import { day77Grammar } from './day-77-grammar';
import { day77Scene } from './day-77-scene';
import { day77Boss } from './day-77-boss';
import { day78Vocab } from './day-78-vocab';
import { day78Listen } from './day-78-listen';
import { day78Grammar } from './day-78-grammar';
import { day78Scene } from './day-78-scene';
import { day78Boss } from './day-78-boss';
import { day79Vocab } from './day-79-vocab';
import { day79Listen } from './day-79-listen';
import { day79Grammar } from './day-79-grammar';
import { day79Scene } from './day-79-scene';
import { day79Boss } from './day-79-boss';
import { day80Vocab } from './day-80-vocab';
import { day80Listen } from './day-80-listen';
import { day80Grammar } from './day-80-grammar';
import { day80Scene } from './day-80-scene';
import { day80Boss } from './day-80-boss';
import { day81Vocab } from './day-81-vocab';
import { day81Listen } from './day-81-listen';
import { day81Grammar } from './day-81-grammar';
import { day81Scene } from './day-81-scene';
import { day81Boss } from './day-81-boss';
import { day82Vocab } from './day-82-vocab';
import { day82Listen } from './day-82-listen';
import { day82Grammar } from './day-82-grammar';
import { day82Scene } from './day-82-scene';
import { day82Boss } from './day-82-boss';
import { day83Vocab } from './day-83-vocab';
import { day83Listen } from './day-83-listen';
import { day83Grammar } from './day-83-grammar';
import { day83Scene } from './day-83-scene';
import { day83Boss } from './day-83-boss';
import { day84Vocab } from './day-84-vocab';
import { day84Listen } from './day-84-listen';
import { day84Grammar } from './day-84-grammar';
import { day84Scene } from './day-84-scene';
import { day84Boss } from './day-84-boss';
import { day85Vocab } from './day-85-vocab';
import { day85Listen } from './day-85-listen';
import { day85Grammar } from './day-85-grammar';
import { day85Scene } from './day-85-scene';
import { day85Boss } from './day-85-boss';
import { day86Vocab } from './day-86-vocab';
import { day86Listen } from './day-86-listen';
import { day86Grammar } from './day-86-grammar';
import { day86Scene } from './day-86-scene';
import { day86Boss } from './day-86-boss';
import { day87Vocab } from './day-87-vocab';
import { day87Listen } from './day-87-listen';
import { day87Grammar } from './day-87-grammar';
import { day87Scene } from './day-87-scene';
import { day87Boss } from './day-87-boss';
import { day88Vocab } from './day-88-vocab';
import { day88Listen } from './day-88-listen';
import { day88Grammar } from './day-88-grammar';
import { day88Scene } from './day-88-scene';
import { day88Boss } from './day-88-boss';
import { day89Vocab } from './day-89-vocab';
import { day89Listen } from './day-89-listen';
import { day89Grammar } from './day-89-grammar';
import { day89Scene } from './day-89-scene';
import { day89Boss } from './day-89-boss';
import { day90Vocab } from './day-90-vocab';
import { day90Listen } from './day-90-listen';
import { day90Grammar } from './day-90-grammar';
import { day90Scene } from './day-90-scene';
import { day90Boss } from './day-90-boss';

const VOCAB_MAP: Record<string, VocabSubQuestData> = {
  'beginner-1': day1Vocab,
  'beginner-2': day2Vocab,
  'beginner-3': day3Vocab,
  'beginner-4': day4Vocab,
  'beginner-5': day5Vocab,
  'beginner-6': day6Vocab,
  'beginner-7': day7Vocab,
  'beginner-8': day8Vocab,
  'beginner-9': day9Vocab,
  'beginner-10': day10Vocab,
  'beginner-11': day11Vocab,
  'beginner-12': day12Vocab,
  'beginner-13': day13Vocab,
  'beginner-14': day14Vocab,
  'beginner-15': day15Vocab,
  'beginner-16': day16Vocab,
  'beginner-17': day17Vocab,
  'beginner-18': day18Vocab,
  'beginner-19': day19Vocab,
  'beginner-20': day20Vocab,
  'beginner-21': day21Vocab,
  'beginner-22': day22Vocab,
  'beginner-23': day23Vocab,
  'beginner-24': day24Vocab,
  'beginner-25': day25Vocab,
  'beginner-26': day26Vocab,
  'beginner-27': day27Vocab,
  'beginner-28': day28Vocab,
  'beginner-29': day29Vocab,
  'beginner-30': day30Vocab,
  'intermediate-1': day31Vocab,
  'intermediate-2': day32Vocab,
  'intermediate-3': day33Vocab,
  'intermediate-4': day34Vocab,
  'intermediate-5': day35Vocab,
  'intermediate-6': day36Vocab,
  'intermediate-7': day37Vocab,
  'intermediate-8': day38Vocab,
  'intermediate-9': day39Vocab,
  'intermediate-10': day40Vocab,
  'intermediate-11': day41Vocab,
  'intermediate-12': day42Vocab,
  'intermediate-13': day43Vocab,
  'intermediate-14': day44Vocab,
  'intermediate-15': day45Vocab,
  'intermediate-16': day46Vocab,
  'intermediate-17': day47Vocab,
  'intermediate-18': day48Vocab,
  'intermediate-19': day49Vocab,
  'intermediate-20': day50Vocab,
  'intermediate-21': day51Vocab,
  'intermediate-22': day52Vocab,
  'intermediate-23': day53Vocab,
  'intermediate-24': day54Vocab,
  'intermediate-25': day55Vocab,
  'intermediate-26': day56Vocab,
  'intermediate-27': day57Vocab,
  'intermediate-28': day58Vocab,
  'intermediate-29': day59Vocab,
  'intermediate-30': day60Vocab,
  'advanced-1': day61Vocab,
  'advanced-2': day62Vocab,
  'advanced-3': day63Vocab,
  'advanced-4': day64Vocab,
  'advanced-5': day65Vocab,
  'advanced-6': day66Vocab,
  'advanced-7': day67Vocab,
  'advanced-8': day68Vocab,
  'advanced-9': day69Vocab,
  'advanced-10': day70Vocab,
  'advanced-11': day71Vocab,
  'advanced-12': day72Vocab,
  'advanced-13': day73Vocab,
  'advanced-14': day74Vocab,
  'advanced-15': day75Vocab,
  'advanced-16': day76Vocab,
  'advanced-17': day77Vocab,
  'advanced-18': day78Vocab,
  'advanced-19': day79Vocab,
  'advanced-20': day80Vocab,
  'advanced-21': day81Vocab,
  'advanced-22': day82Vocab,
  'advanced-23': day83Vocab,
  'advanced-24': day84Vocab,
  'advanced-25': day85Vocab,
  'advanced-26': day86Vocab,
  'advanced-27': day87Vocab,
  'advanced-28': day88Vocab,
  'advanced-29': day89Vocab,
  'advanced-30': day90Vocab,
};
const LISTEN_MAP: Record<string, ListenSubQuestData> = {
  'beginner-1': day1Listen,
  'beginner-2': day2Listen,
  'beginner-3': day3Listen,
  'beginner-4': day4Listen,
  'beginner-5': day5Listen,
  'beginner-6': day6Listen,
  'beginner-7': day7Listen,
  'beginner-8': day8Listen,
  'beginner-9': day9Listen,
  'beginner-10': day10Listen,
  'beginner-11': day11Listen,
  'beginner-12': day12Listen,
  'beginner-13': day13Listen,
  'beginner-14': day14Listen,
  'beginner-15': day15Listen,
  'beginner-16': day16Listen,
  'beginner-17': day17Listen,
  'beginner-18': day18Listen,
  'beginner-19': day19Listen,
  'beginner-20': day20Listen,
  'beginner-21': day21Listen,
  'beginner-22': day22Listen,
  'beginner-23': day23Listen,
  'beginner-24': day24Listen,
  'beginner-25': day25Listen,
  'beginner-26': day26Listen,
  'beginner-27': day27Listen,
  'beginner-28': day28Listen,
  'beginner-29': day29Listen,
  'beginner-30': day30Listen,
  'intermediate-1': day31Listen,
  'intermediate-2': day32Listen,
  'intermediate-3': day33Listen,
  'intermediate-4': day34Listen,
  'intermediate-5': day35Listen,
  'intermediate-6': day36Listen,
  'intermediate-7': day37Listen,
  'intermediate-8': day38Listen,
  'intermediate-9': day39Listen,
  'intermediate-10': day40Listen,
  'intermediate-11': day41Listen,
  'intermediate-12': day42Listen,
  'intermediate-13': day43Listen,
  'intermediate-14': day44Listen,
  'intermediate-15': day45Listen,
  'intermediate-16': day46Listen,
  'intermediate-17': day47Listen,
  'intermediate-18': day48Listen,
  'intermediate-19': day49Listen,
  'intermediate-20': day50Listen,
  'intermediate-21': day51Listen,
  'intermediate-22': day52Listen,
  'intermediate-23': day53Listen,
  'intermediate-24': day54Listen,
  'intermediate-25': day55Listen,
  'intermediate-26': day56Listen,
  'intermediate-27': day57Listen,
  'intermediate-28': day58Listen,
  'intermediate-29': day59Listen,
  'intermediate-30': day60Listen,
  'advanced-1': day61Listen,
  'advanced-2': day62Listen,
  'advanced-3': day63Listen,
  'advanced-4': day64Listen,
  'advanced-5': day65Listen,
  'advanced-6': day66Listen,
  'advanced-7': day67Listen,
  'advanced-8': day68Listen,
  'advanced-9': day69Listen,
  'advanced-10': day70Listen,
  'advanced-11': day71Listen,
  'advanced-12': day72Listen,
  'advanced-13': day73Listen,
  'advanced-14': day74Listen,
  'advanced-15': day75Listen,
  'advanced-16': day76Listen,
  'advanced-17': day77Listen,
  'advanced-18': day78Listen,
  'advanced-19': day79Listen,
  'advanced-20': day80Listen,
  'advanced-21': day81Listen,
  'advanced-22': day82Listen,
  'advanced-23': day83Listen,
  'advanced-24': day84Listen,
  'advanced-25': day85Listen,
  'advanced-26': day86Listen,
  'advanced-27': day87Listen,
  'advanced-28': day88Listen,
  'advanced-29': day89Listen,
  'advanced-30': day90Listen,
};
const GRAMMAR_MAP: Record<string, GrammarSubQuestData> = {
  'beginner-1': day1Grammar,
  'beginner-2': day2Grammar,
  'beginner-3': day3Grammar,
  'beginner-4': day4Grammar,
  'beginner-5': day5Grammar,
  'beginner-6': day6Grammar,
  'beginner-7': day7Grammar,
  'beginner-8': day8Grammar,
  'beginner-9': day9Grammar,
  'beginner-10': day10Grammar,
  'beginner-11': day11Grammar,
  'beginner-12': day12Grammar,
  'beginner-13': day13Grammar,
  'beginner-14': day14Grammar,
  'beginner-15': day15Grammar,
  'beginner-16': day16Grammar,
  'beginner-17': day17Grammar,
  'beginner-18': day18Grammar,
  'beginner-19': day19Grammar,
  'beginner-20': day20Grammar,
  'beginner-21': day21Grammar,
  'beginner-22': day22Grammar,
  'beginner-23': day23Grammar,
  'beginner-24': day24Grammar,
  'beginner-25': day25Grammar,
  'beginner-26': day26Grammar,
  'beginner-27': day27Grammar,
  'beginner-28': day28Grammar,
  'beginner-29': day29Grammar,
  'beginner-30': day30Grammar,
  'intermediate-1': day31Grammar,
  'intermediate-2': day32Grammar,
  'intermediate-3': day33Grammar,
  'intermediate-4': day34Grammar,
  'intermediate-5': day35Grammar,
  'intermediate-6': day36Grammar,
  'intermediate-7': day37Grammar,
  'intermediate-8': day38Grammar,
  'intermediate-9': day39Grammar,
  'intermediate-10': day40Grammar,
  'intermediate-11': day41Grammar,
  'intermediate-12': day42Grammar,
  'intermediate-13': day43Grammar,
  'intermediate-14': day44Grammar,
  'intermediate-15': day45Grammar,
  'intermediate-16': day46Grammar,
  'intermediate-17': day47Grammar,
  'intermediate-18': day48Grammar,
  'intermediate-19': day49Grammar,
  'intermediate-20': day50Grammar,
  'intermediate-21': day51Grammar,
  'intermediate-22': day52Grammar,
  'intermediate-23': day53Grammar,
  'intermediate-24': day54Grammar,
  'intermediate-25': day55Grammar,
  'intermediate-26': day56Grammar,
  'intermediate-27': day57Grammar,
  'intermediate-28': day58Grammar,
  'intermediate-29': day59Grammar,
  'intermediate-30': day60Grammar,
  'advanced-1': day61Grammar,
  'advanced-2': day62Grammar,
  'advanced-3': day63Grammar,
  'advanced-4': day64Grammar,
  'advanced-5': day65Grammar,
  'advanced-6': day66Grammar,
  'advanced-7': day67Grammar,
  'advanced-8': day68Grammar,
  'advanced-9': day69Grammar,
  'advanced-10': day70Grammar,
  'advanced-11': day71Grammar,
  'advanced-12': day72Grammar,
  'advanced-13': day73Grammar,
  'advanced-14': day74Grammar,
  'advanced-15': day75Grammar,
  'advanced-16': day76Grammar,
  'advanced-17': day77Grammar,
  'advanced-18': day78Grammar,
  'advanced-19': day79Grammar,
  'advanced-20': day80Grammar,
  'advanced-21': day81Grammar,
  'advanced-22': day82Grammar,
  'advanced-23': day83Grammar,
  'advanced-24': day84Grammar,
  'advanced-25': day85Grammar,
  'advanced-26': day86Grammar,
  'advanced-27': day87Grammar,
  'advanced-28': day88Grammar,
  'advanced-29': day89Grammar,
  'advanced-30': day90Grammar,
};
const SCENE_MAP: Record<string, SceneSubQuestData> = {
  'beginner-1': day1Scene,
  'beginner-2': day2Scene,
  'beginner-3': day3Scene,
  'beginner-4': day4Scene,
  'beginner-5': day5Scene,
  'beginner-6': day6Scene,
  'beginner-7': day7Scene,
  'beginner-8': day8Scene,
  'beginner-9': day9Scene,
  'beginner-10': day10Scene,
  'beginner-11': day11Scene,
  'beginner-12': day12Scene,
  'beginner-13': day13Scene,
  'beginner-14': day14Scene,
  'beginner-15': day15Scene,
  'beginner-16': day16Scene,
  'beginner-17': day17Scene,
  'beginner-18': day18Scene,
  'beginner-19': day19Scene,
  'beginner-20': day20Scene,
  'beginner-21': day21Scene,
  'beginner-22': day22Scene,
  'beginner-23': day23Scene,
  'beginner-24': day24Scene,
  'beginner-25': day25Scene,
  'beginner-26': day26Scene,
  'beginner-27': day27Scene,
  'beginner-28': day28Scene,
  'beginner-29': day29Scene,
  'beginner-30': day30Scene,
  'intermediate-1': day31Scene,
  'intermediate-2': day32Scene,
  'intermediate-3': day33Scene,
  'intermediate-4': day34Scene,
  'intermediate-5': day35Scene,
  'intermediate-6': day36Scene,
  'intermediate-7': day37Scene,
  'intermediate-8': day38Scene,
  'intermediate-9': day39Scene,
  'intermediate-10': day40Scene,
  'intermediate-11': day41Scene,
  'intermediate-12': day42Scene,
  'intermediate-13': day43Scene,
  'intermediate-14': day44Scene,
  'intermediate-15': day45Scene,
  'intermediate-16': day46Scene,
  'intermediate-17': day47Scene,
  'intermediate-18': day48Scene,
  'intermediate-19': day49Scene,
  'intermediate-20': day50Scene,
  'intermediate-21': day51Scene,
  'intermediate-22': day52Scene,
  'intermediate-23': day53Scene,
  'intermediate-24': day54Scene,
  'intermediate-25': day55Scene,
  'intermediate-26': day56Scene,
  'intermediate-27': day57Scene,
  'intermediate-28': day58Scene,
  'intermediate-29': day59Scene,
  'intermediate-30': day60Scene,
  'advanced-1': day61Scene,
  'advanced-2': day62Scene,
  'advanced-3': day63Scene,
  'advanced-4': day64Scene,
  'advanced-5': day65Scene,
  'advanced-6': day66Scene,
  'advanced-7': day67Scene,
  'advanced-8': day68Scene,
  'advanced-9': day69Scene,
  'advanced-10': day70Scene,
  'advanced-11': day71Scene,
  'advanced-12': day72Scene,
  'advanced-13': day73Scene,
  'advanced-14': day74Scene,
  'advanced-15': day75Scene,
  'advanced-16': day76Scene,
  'advanced-17': day77Scene,
  'advanced-18': day78Scene,
  'advanced-19': day79Scene,
  'advanced-20': day80Scene,
  'advanced-21': day81Scene,
  'advanced-22': day82Scene,
  'advanced-23': day83Scene,
  'advanced-24': day84Scene,
  'advanced-25': day85Scene,
  'advanced-26': day86Scene,
  'advanced-27': day87Scene,
  'advanced-28': day88Scene,
  'advanced-29': day89Scene,
  'advanced-30': day90Scene,
};
const BOSS_MAP: Record<string, BossSubQuestData> = {
  'beginner-1': day1Boss,
  'beginner-2': day2Boss,
  'beginner-3': day3Boss,
  'beginner-4': day4Boss,
  'beginner-5': day5Boss,
  'beginner-6': day6Boss,
  'beginner-7': day7Boss,
  'beginner-8': day8Boss,
  'beginner-9': day9Boss,
  'beginner-10': day10Boss,
  'beginner-11': day11Boss,
  'beginner-12': day12Boss,
  'beginner-13': day13Boss,
  'beginner-14': day14Boss,
  'beginner-15': day15Boss,
  'beginner-16': day16Boss,
  'beginner-17': day17Boss,
  'beginner-18': day18Boss,
  'beginner-19': day19Boss,
  'beginner-20': day20Boss,
  'beginner-21': day21Boss,
  'beginner-22': day22Boss,
  'beginner-23': day23Boss,
  'beginner-24': day24Boss,
  'beginner-25': day25Boss,
  'beginner-26': day26Boss,
  'beginner-27': day27Boss,
  'beginner-28': day28Boss,
  'beginner-29': day29Boss,
  'beginner-30': day30Boss,
  'intermediate-1': day31Boss,
  'intermediate-2': day32Boss,
  'intermediate-3': day33Boss,
  'intermediate-4': day34Boss,
  'intermediate-5': day35Boss,
  'intermediate-6': day36Boss,
  'intermediate-7': day37Boss,
  'intermediate-8': day38Boss,
  'intermediate-9': day39Boss,
  'intermediate-10': day40Boss,
  'intermediate-11': day41Boss,
  'intermediate-12': day42Boss,
  'intermediate-13': day43Boss,
  'intermediate-14': day44Boss,
  'intermediate-15': day45Boss,
  'intermediate-16': day46Boss,
  'intermediate-17': day47Boss,
  'intermediate-18': day48Boss,
  'intermediate-19': day49Boss,
  'intermediate-20': day50Boss,
  'intermediate-21': day51Boss,
  'intermediate-22': day52Boss,
  'intermediate-23': day53Boss,
  'intermediate-24': day54Boss,
  'intermediate-25': day55Boss,
  'intermediate-26': day56Boss,
  'intermediate-27': day57Boss,
  'intermediate-28': day58Boss,
  'intermediate-29': day59Boss,
  'intermediate-30': day60Boss,
  'advanced-1': day61Boss,
  'advanced-2': day62Boss,
  'advanced-3': day63Boss,
  'advanced-4': day64Boss,
  'advanced-5': day65Boss,
  'advanced-6': day66Boss,
  'advanced-7': day67Boss,
  'advanced-8': day68Boss,
  'advanced-9': day69Boss,
  'advanced-10': day70Boss,
  'advanced-11': day71Boss,
  'advanced-12': day72Boss,
  'advanced-13': day73Boss,
  'advanced-14': day74Boss,
  'advanced-15': day75Boss,
  'advanced-16': day76Boss,
  'advanced-17': day77Boss,
  'advanced-18': day78Boss,
  'advanced-19': day79Boss,
  'advanced-20': day80Boss,
  'advanced-21': day81Boss,
  'advanced-22': day82Boss,
  'advanced-23': day83Boss,
  'advanced-24': day84Boss,
  'advanced-25': day85Boss,
  'advanced-26': day86Boss,
  'advanced-27': day87Boss,
  'advanced-28': day88Boss,
  'advanced-29': day89Boss,
  'advanced-30': day90Boss,
};

export function getSubQuest(
  level: ToriLevel,
  day: number,
  idx: ToriSubQuestIdx,
): AnySubQuestData | null {
  const key = `${level}-${day}`;
  if (idx === 1) return VOCAB_MAP[key] ?? null;
  if (idx === 2) return LISTEN_MAP[key] ?? null;
  if (idx === 3) return GRAMMAR_MAP[key] ?? null;
  if (idx === 4) return SCENE_MAP[key] ?? null;
  if (idx === 5) return BOSS_MAP[key] ?? null;
  return null;
}

export function hasSubQuest(level: ToriLevel, day: number, idx: ToriSubQuestIdx): boolean {
  return getSubQuest(level, day, idx) !== null;
}
