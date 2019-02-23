import axios from 'axios'

export default {
    getAllTables() {
        return axios.get('/Document/GetAllDocuments?collectionName=Test')
            .then(response => {
                return response.data
            })
    },
    upsertTable(documentModelDto) {
        return axios.post('/Document/UpsertDocument', documentModelDto)
    }
}

///Document/GetDocument?collectionName=Test&documentId=Classes
///Document/GetAllDocuments?collectionName=Test