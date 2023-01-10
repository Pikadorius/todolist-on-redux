let data = [
    {id: 'todolistId1', title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
    {id: 'todolistId2', title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
]

let obj = data.reduce((res, currentValue)=>{
    res[currentValue.id]=[]
    return res
},{})

console.log(obj)