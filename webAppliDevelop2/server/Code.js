import doGet from './functions/doGet'
import sample from './functions/sample'
import {selectBooksAll, selectBooksSearch} from './functions/select'
import {insertBookInfo, deleteBookInfo} from './functions/update'
import { getKindName,getKindKey } from './functions/functionsUtil'

global.doGet = doGet
global.sample = sample
global.selectBooksAll = selectBooksAll
global.selectBooksSearch = selectBooksSearch
global.insertBookInfo = insertBookInfo
global.deleteBookInfo = deleteBookInfo
global.getKindName = getKindName
global.getKindKey = getKindKey
