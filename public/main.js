document.getElementById("deleteButton").addEventListener("click", deleteEntry)
document.getElementById("updateButton").addEventListener("click", updateEntry)


async function deleteEntry(){
    const input = document.getElementById("deleteInput")
    try{
        const response = await fetch('deleteEntry', {
            method: 'delete',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                name: input.value
            })
        })
        const data = await response.json()
        location.reload()
    } catch (err){
        console.log(err)
    }
}

async function updateEntry(){
    try{
        const response = await fetch('updateEntry', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: document.getElementsByName('name')[0].value,
                fullName: document.getElementsByName('fullName')[0].value,
                actor: document.getElementsByName('actor')[0].value,
                parents: document.getElementsByName('parents')[0].value,
                siblings: document.getElementsByName('siblings')[0].value,
                relationships: document.getElementsByName('relationships')[0].value,
            })
        })
        const date = await response.json()
        location.reload()
    } catch(err){
        console.log(err)
    }
}

