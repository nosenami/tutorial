import doGet from './functions/doGet'
import sample from './functions/sample'
import {selectAllBooks, selectSearchedBooks} from './functions/select'
import {insertBookInfo, deleteBookInfo} from './functions/update'
import { getKindName,getKindKey } from './functions/functionsUtil'

global.doGet = doGet
global.sample = sample
global.selectAllBooks = selectAllBooks
global.selectSearchedBooks = selectSearchedBooks
global.insertBookInfo = insertBookInfo
global.deleteBookInfo = deleteBookInfo
global.getKindName = getKindName
global.getKindKey = getKindKey
