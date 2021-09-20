const loadBook = () => {
    const searchField = document.getElementById('input-bar')
    const searchText = searchField.value;

    const url = `https://openlibrary.org/search.json?q=${searchText}`
    const emtyError = document.getElementById('empty-message');

    if (searchField.value === "") {
        // console.log('please insert Something')
        emtyError.style.display = 'block';



    }

    //    else statement for fetch url

    else {

        fetch(url)
            .then((response) => {
                if (response.status >= 200 && response.status <= 299) {
                    return response.json();
                } else {
                    throw Error(response.statusText);
                }
            })
            // .then((data) => {
            //     return showBook(data.docs);
            //     // do whatever you want with the JSON response
            // })
            .then(data => showBook(data.docs))

            .catch((error) => {
                // Handle the error

                console.log('Something went wrong')
                console.log(error);


            });
        emtyError.textContent = ' ';



    }
    searchField.value = ' ';


}
const showBook = datas => {
    const bookContainer = document.getElementById('book-container')

    bookContainer.innerHTML = ' ';



    datas.forEach(data => {
        // console.log(data.first_publish_year)
        // console.log(data)
        // console.log(JSON.parse(data))
        const urls = ` https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg `

        const div = document.createElement('div')
        div.classList.add('find')

        if (data.author_name === undefined || data.cover_i === undefined || data.first_publish_year === undefined) {

            div.innerHTML = `

            <div class=" h-96 border-2 border-gray-300 rounded-lg p-8 font-light text-gray-800">
                <div class="mb-4"> <img class="w-32 h-32" src="images/notfound.png "> </div>
                <div> 
                        <h1 class="text-lg">Book Name: ${data.title} </h1>
                        <h2>Author Name:<span class="text-red-800 font-semibold"> Author Not found!</span> </h2>
                        <h3>First-Published:<span class="text-red-700 font-light text-center text-md"> Year NOT Available </span> </h3>
                </div>
            </div>
           
        `
        }
        else {
            div.innerHTML = `
                <div class=" h-96 border-2 border-gray-300 rounded-lg p-8 font-light text-gray-800">
                    <div class="mb-4"> <img class="w-32 h-32" src=" https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg"> </div>
                    <div> 
                            <h1 class="text-lg">Book Name: ${data.title} </h1>
                            <h2>Author Name: ${data.author_name} </h2>
                            <h3>First-Published:${data.first_publish_year} </h3>

                    </div>
                </div>
        `
        }
        bookContainer.appendChild(div)



    })
    // console.log(`${toFind.length} result found`)
    const calling = loadResult();
}
// showing no result
const loadResult = () => {


    const toFind = document.getElementsByClassName('find').length;
    // console.log(typeof toFind)
    if (toFind > 0) {
        const showFound = document.getElementById('result');
        showFound.innerText = `${toFind} Result Found`
        const noFound = document.getElementById('no-result');
        noFound.innerText = ' ';

    }
    else {
        const noFound = document.getElementById('no-result');
        noFound.innerText = ` No result found!`
        const showFound = document.getElementById('result');
        showFound.innerText = ' ';
    }

    return toFind;
}


