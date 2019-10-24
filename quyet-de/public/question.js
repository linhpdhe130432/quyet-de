window.onload = () => {
    
    // get id from url
    const questId = window.location.pathname.split('/')[2];
        fetch(`/get-question-by-id/${questId}`)
            .then( (response) => {
                return response.json();
            }) // call if this request success
            .then((data)=> {
                const question = document.querySelector('.question-content');
                const vote = document.querySelector('.total-vote');
                const like = document.querySelector('.total-like');
                const dislike = document.querySelector('.total-dislike');
                
                question.innerText = `${data.data.content}`;  
                vote.innerText = `${data.data.like+data.data.dislike} Vote`;
                if (data.data.like+data.data.dislike==0) {
                    like.innerText = `0% liked`;  
                    dislike.innerText = `0% disliked`;
                } else {

                //toFixed(number) get number after number , return string value   
                like.innerText = `${(data.data.like/(data.data.like+data.data.dislike)*100).toFixed(2)}% liked`; 

                dislike.innerText = `${data.data.dislike/(data.data.like+data.data.dislike)*100}% disliked`;
                }
                
            })
            .catch((error) => {
                console.log("lỗi rồi");
                console.log(error);
            }); // call if this request fail    
}