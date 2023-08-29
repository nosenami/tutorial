import doGet from './functions/doGet'
import sample from './functions/sample'
import {selectBooksAll} from './functions/select'
import {insertBookInfo} from './functions/update'
import { getKindName } from './functions/functionsUtil'

global.doGet = doGet
global.sample = sample
global.selectBooksAll = selectBooksAll
global.insertBookInfo = insertBookInfo
global.getKindName = getKindName
