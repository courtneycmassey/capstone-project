

// returns the data from each document in a collection
export const firebaseLooper = (snapshot) => {

    let data = [];
    snapshot.forEach( doc => {
        data.push({
            ...doc.data(),
            id: doc.id
        })
    })


    return data;

}