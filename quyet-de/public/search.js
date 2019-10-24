window.onload = () => {
    const textSearch = document.querySelector('.search');
    const formSubmit = document.querySelector('.input-search');
    const searchResult = document.getElementById("search-Result");
    const total = document.querySelector('.total');
    formSubmit.addEventListener('submit', (event) => {
        event.preventDefault();
        // Delete all result before
        while (searchResult.firstChild) {
            searchResult.removeChild(searchResult.firstChild);
        }

        //use fetch() API to send data to server 
        fetch(`/search-by-name`, {
            method: 'POST',// uppercase all characters;
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                search: textSearch.value,
            }),
        })
            .then((response) => {
                return response.json();
            }) // call if this request success
            .then((data) => {
                if (data.data.length == 0) {
                    total.innerText = "Không có kết quả";
                } else {
                    //Create table to show Result
                    var tagTable = document.createElement("table");


                    var push = document.createElement("th")
                    var textNode = document.createTextNode("Nội dung câu hỏi");
                    push.appendChild(textNode);

                    var push = document.createElement("th")
                    var textNode = document.createTextNode("Like");
                    push.appendChild(textNode);

                    var push = document.createElement("th")
                    var textNode = document.createTextNode("Dislike");
                    push.appendChild(textNode);

                    for (var i = 0; i < data.data.length; i++) {
                        var textNode = document.createTextNode(data.data[i].content);
                        push.appendChild(textNode);
                        var textNode = document.createTextNode(data.data[i].like);
                        push.appendChild(textNode);
                        var textNode = document.createTextNode(data.data[i].dislike);
                        push.appendChild(textNode);
                    }

                    searchResult.append(tagTable);
                    total.innerText = `Có ${data.data.length} kết quả được tìm thấy`;
                }

            })
            .catch((error) => {
                console.log(error);
            }); // call if this request fail

    });
};