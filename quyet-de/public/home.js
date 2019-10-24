window.onload = () => {
    const like =  document.querySelector('.like');
    const dislike =  document.querySelector('.dislike');  
    const info =  document.querySelector('.info'); 
    const other =  document.querySelector('.other'); 

    // get id from url
        fetch(`/get-question`)
            .then( (response) => {
                return response.json();
            }) // call if this request success
            .then((data)=> {
                const question = document.querySelector('.question-content');
                question.innerText = `${data.data.content}`; 
            
                like.addEventListener('click',(event) => {
                    fetch(`/vote/${data.data._id}/1`,{
                        method: 'POST',// uppercase all characters;
                    })
                        .then( (response) => {
                            return response.json();
                        }) // call if this request success
                        .then((data)=> {
                            window.location.href=`/questions/${data.data}`;
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                dislike.addEventListener('click',(event) => {
                    fetch(`/vote/${data.data._id}/0`,{
                        method: 'POST',// uppercase all characters;
                    })
                        .then( (response) => {
                            return response.json();
                            
                        }) // call if this request success
                        .then((data)=> {
                            
                            window.location.href=`/questions/${data.data}`;
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                info.addEventListener('click',(event)=>{
                    window.location.href=`/questions/${data.data._id}`;
                });
                
                other.addEventListener('click',(event)=>{
                    window.location.href=`/`;
                });
            })
            .catch((error) => {
                
                console.log(error);
            }); // call if this request fail    
}