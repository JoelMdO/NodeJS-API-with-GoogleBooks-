
const bookServices = require('../services/book');
const axios = require('axios');
require('dotenv').config();

//**To search Books in Google Books 
exports.onlineSearchBook = async function (request, response) {
    const { searchType, searchSubject } = request.params;
    console.log(searchType, searchSubject);
    // return response.json(mockResponse);
    const key = process.env.API_KEY;
    const Url = `https://www.googleapis.com/books/v1/volumes?q=${searchType}:${searchSubject}&&filter=partial&key=${key}`;
    axios.get(Url).then((axiosResponse) => {
        try {
            const foundBook = axiosResponse.data;
            if (!foundBook) {
                return response.status(204).json({ message: 'Book not found, try a new search' });
            } else {
                console.log(foundBook);
                return response.status(200).json(foundBook);
            }
        } catch (e) {
            return 'Error is:', e;
        }
    });
};

//**ok */
exports.saveLibraryBook = async function (request, response) {
    const jsonBodyforNodeJSAPI = request.body;
    console.log(`SaveLbrarybookReceived: ${jsonBodyforNodeJSAPI}`);
    if (!jsonBodyforNodeJSAPI) {
        return response.status(400).json({ message: 'Please select a proper book' });
    } else {
        try {
            const newbooksaved = await bookServices.saveNewBook(jsonBodyforNodeJSAPI);
            console.log(newbooksaved.toJSON);
            return response.status(201).json({ message: 'Book Saved', jsonBodyforNodeJSAPI });
        } catch (e) {
            console.log('Error is:', e);
            throw e;
        }
    }
};

//Get current reading Book from the bookshelf
exports.reading = async function (request, response) {
    let { reading } = request.params;
    console.log(`reading controller: ${reading}`);
    const loadbook = await bookServices.reading(reading);
    console.log(`reading loadbook: ${loadbook}`);
    if (!loadbook) {
        return response.status(404).json({ message: 'Please open a book to read' });
    } else {
        try {
            return response.status(200).json({ message: 'Book Found', loadbook });
        } catch (e) {
            console.log('Error is:', e);
            throw e;
        }
    }
};

//**Get current saved Books from the user library
exports.toread = async function (request, response) {
    const { toread } = request.params;
    console.log(`toreadController ${toread}`);
    const loadbook = await bookServices.toread(toread);
    console.log(`toReadBook Controller: ${loadbook}`);
    if (!loadbook) {
        return response.status(404).json({ message: 'Please add a book to your library' });
    } else {
        try {
            return response.status(200).json({ message: 'Book Found', loadbook });
        } catch (e) {
            console.log('Error is:', e);
            throw e;
        }
    }
};

//**Get current favorite Books from the user library / favorites table
exports.favorites = async function (request, response) {
    const { favorites } = request.params;
    console.log(`favorites controller: ${favorites}`);
    const loadbook = await bookServices.favorites(favorites);
    console.log(`favorites loadbook: ${loadbook.toString()}`);
    if (!loadbook) {
        return response.status(404).json({ message: 'Books not found, please try again' });
    } else {
        try {
            return response.status(200).json({ message: 'Book Found', loadbook });
        } catch (e) {
            console.log('Error is:', e);
            throw e;
        }
    };
}

//**Get current read done Books from the user library / readagain table
exports.readagain = async function (request, response) {
    const { readagain } = request.params;
    console.log(`readagain controller: ${readagain}`);
    const loadbook = await bookServices.readagain(readagain);
    console.log(`readAgain loadbook: ${loadbook}`);
    if (!loadbook) {
        return response.status(404).json({ message: 'Books not found, please try again' });
    } else {
        try {
            return response.status(200).json({ message: 'Book Found', loadbook });
        } catch (e) {
            console.log('Error is:', e);
            throw e;
        }
    }
};

const mockResponse = {
    kind: 'books#volumes',
    totalItems: 885,
    items: [
        {
            kind: 'books#volume',
            id: 'nnYxEAAAQBAJ',
            etag: 'w42OHte6X5o',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/nnYxEAAAQBAJ',
            volumeInfo:
            {
                title: 'British Music Videos 1966 - 2016',
                subtitle: 'Genre, Authenticity and Art',
                authors: ['Caston Emily Caston'],
                imageLinks: { smallThumbnail: 'https://www.shutterstock.com/shutterstock/photos/2105152760/display_1500/stock-vector--d-books-icon-for-web-design-isolated-education-and-online-class-concept-eps-vector-2105152760.jpg', thumbnail: 'https://www.shutterstock.com/shutterstock/photos/2105152760/display_1500/stock-vector--d-books-icon-for-web-design-isolated-education-and-online-class-concept-eps-vector-2105152760.jpg', },
                description: 'Based on new archival evidence and interviews, and setting out a new theoretical framework for music video analysis, Emily Caston presents a major new analysis of music videos from 1966-2016, identifying not only their distinctive British traits, but their parallels with British film genres and styles. By analysing the genre, craft and authorial voice of music video within the context of film and popular music, the book sheds new light on existing theoretical and historical questions about audiences, authorship, art and the creative industries. Far from being an American cultural form, the book reveals music video\'s roots in British and European film traditions, and suggests significant ways in which Br'
            },
        },
        {
            kind: 'books#volume',
            id: 'nnYxEAAAQBAJ',
            etag: 'w42OHte6X5o',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/nnYxEAAAQBAJ',
            volumeInfo:
            {
                title: 'British Music Videos 1966 - 2016',
                subtitle: 'Genre, Authenticity and Art',
                authors: ['Caston Emily Caston'],
                imageLinks: { smallThumbnail: 'https://www.shutterstock.com/shutterstock/photos/2105152760/display_1500/stock-vector--d-books-icon-for-web-design-isolated-education-and-online-class-concept-eps-vector-2105152760.jpg', thumbnail: 'https://www.shutterstock.com/shutterstock/photos/2105152760/display_1500/stock-vector--d-books-icon-for-web-design-isolated-education-and-online-class-concept-eps-vector-2105152760.jpg', },
                description: 'Based on new archival evidence and interviews, and setting out a new theoretical framework for music video analysis, Emily Caston presents a major new analysis of music videos from 1966-2016, identifying not only their distinctive British traits, but their parallels with British film genres and styles. By analysing the genre, craft and authorial voice of music video within the context of film and popular music, the book sheds new light on existing theoretical and historical questions about audiences, authorship, art and the creative industries. Far from being an American cultural form, the book reveals music video\'s roots in British and European film traditions, and suggests significant ways in which Br'
            },
        },
        {
            kind: 'books#volume',
            id: 'nnYxEAAAQBAJ',
            etag: 'w42OHte6X5o',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/nnYxEAAAQBAJ',
            volumeInfo:
            {
                title: 'British Music Videos 1966 - 2016',
                subtitle: 'Genre, Authenticity and Art',
                authors: ['Caston Emily Caston'],
                imageLinks: { smallThumbnail: 'https://www.shutterstock.com/shutterstock/photos/2105152760/display_1500/stock-vector--d-books-icon-for-web-design-isolated-education-and-online-class-concept-eps-vector-2105152760.jpg', thumbnail: 'https://www.shutterstock.com/shutterstock/photos/2105152760/display_1500/stock-vector--d-books-icon-for-web-design-isolated-education-and-online-class-concept-eps-vector-2105152760.jpg', },
                description: 'Based on new archival evidence and interviews, and setting out a new theoretical framework for music video analysis, Emily Caston presents a major new analysis of music videos from 1966-2016, identifying not only their distinctive British traits, but their parallels with British film genres and styles. By analysing the genre, craft and authorial voice of music video within the context of film and popular music, the book sheds new light on existing theoretical and historical questions about audiences, authorship, art and the creative industries. Far from being an American cultural form, the book reveals music video\'s roots in British and European film traditions, and suggests significant ways in which Br'
            },
        },
        {
            kind: 'books#volume',
            id: 'nnYxEAAAQBAJ',
            etag: 'w42OHte6X5o',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/nnYxEAAAQBAJ',
            volumeInfo:
            {
                title: 'British Music Videos 1966 - 2016',
                subtitle: 'Genre, Authenticity and Art',
                authors: ['Caston Emily Caston'],
                imageLinks: { smallThumbnail: 'https://www.shutterstock.com/shutterstock/photos/2105152760/display_1500/stock-vector--d-books-icon-for-web-design-isolated-education-and-online-class-concept-eps-vector-2105152760.jpg', thumbnail: 'https://www.shutterstock.com/shutterstock/photos/2105152760/display_1500/stock-vector--d-books-icon-for-web-design-isolated-education-and-online-class-concept-eps-vector-2105152760.jpg', },
                description: 'Based on new archival evidence and interviews, and setting out a new theoretical framework for music video analysis, Emily Caston presents a major new analysis of music videos from 1966-2016, identifying not only their distinctive British traits, but their parallels with British film genres and styles. By analysing the genre, craft and authorial voice of music video within the context of film and popular music, the book sheds new light on existing theoretical and historical questions about audiences, authorship, art and the creative industries. Far from being an American cultural form, the book reveals music video\'s roots in British and European film traditions, and suggests significant ways in which Br'
            },
        },
        {
            kind: 'books#volume',
            id: 'nnYxEAAAQBAJ',
            etag: 'w42OHte6X5o',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/nnYxEAAAQBAJ',
            volumeInfo:
            {
                title: 'British Music Videos 1966 - 2016',
                subtitle: 'Genre, Authenticity and Art',
                authors: ['Caston Emily Caston'],
                imageLinks: { smallThumbnail: 'https://www.shutterstock.com/shutterstock/photos/2105152760/display_1500/stock-vector--d-books-icon-for-web-design-isolated-education-and-online-class-concept-eps-vector-2105152760.jpg', thumbnail: 'https://www.shutterstock.com/shutterstock/photos/2105152760/display_1500/stock-vector--d-books-icon-for-web-design-isolated-education-and-online-class-concept-eps-vector-2105152760.jpg', },
                description: 'Based on new archival evidence and interviews, and setting out a new theoretical framework for music video analysis, Emily Caston presents a major new analysis of music videos from 1966-2016, identifying not only their distinctive British traits, but their parallels with British film genres and styles. By analysing the genre, craft and authorial voice of music video within the context of film and popular music, the book sheds new light on existing theoretical and historical questions about audiences, authorship, art and the creative industries. Far from being an American cultural form, the book reveals music video\'s roots in British and European film traditions, and suggests significant ways in which Br'
            },
        },
        {
            kind: 'books#volume',
            id: 'nnYxEAAAQBAJ',
            etag: 'w42OHte6X5o',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/nnYxEAAAQBAJ',
            volumeInfo:
            {
                title: 'British Music Videos 1966 - 2016',
                subtitle: 'Genre, Authenticity and Art',
                authors: ['Caston Emily Caston'],
                imageLinks: {
                    smallThumbnail: 'https://www.shutterstock.com/shutterstock/photos/2105152760/display_1500/stock-vector--d-books-icon-for-web-design-isolated-education-and-online-class-concept-eps-vector-2105152760.jpg',
                    thumbnail: 'https://www.shutterstock.com/shutterstock/photos/2105152760/display_1500/stock-vector--d-books-icon-for-web-design-isolated-education-and-online-class-concept-eps-vector-2105152760.jpg',
                },
                description: 'Based on new archival evidence and interviews, and setting out a new theoretical framework for music video analysis, Emily Caston presents a major new analysis of music videos from 1966-2016, identifying not only their distinctive British traits, but their parallels with British film genres and styles. By analysing the genre, craft and authorial voice of music video within the context of film and popular music, the book sheds new light on existing theoretical and historical questions about audiences, authorship, art and the creative industries. Far from being an American cultural form, the book reveals music video\'s roots in British and European film traditions, and suggests significant ways in which Br'
            },
        },
        {
            kind: 'books#volume',
            id: 'nnYxEAAAQBAJ',
            etag: 'w42OHte6X5o',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/nnYxEAAAQBAJ',
            volumeInfo:
            {
                title: 'British Music Videos 1966 - 2016',
                subtitle: 'Genre, Authenticity and Art',
                authors: ['Caston Emily Caston'],
                imageLinks: {
                    smallThumbnail: 'https://www.shutterstock.com/shutterstock/photos/2105152760/display_1500/stock-vector--d-books-icon-for-web-design-isolated-education-and-online-class-concept-eps-vector-2105152760.jpg',
                    thumbnail: 'https://www.shutterstock.com/shutterstock/photos/2105152760/display_1500/stock-vector--d-books-icon-for-web-design-isolated-education-and-online-class-concept-eps-vector-2105152760.jpg',
                },
                description: 'Based on new archival evidence and interviews, and setting out a new theoretical framework for music video analysis, Emily Caston presents a major new analysis of music videos from 1966-2016, identifying not only their distinctive British traits, but their parallels with British film genres and styles. By analysing the genre, craft and authorial voice of music video within the context of film and popular music, the book sheds new light on existing theoretical and historical questions about audiences, authorship, art and the creative industries. Far from being an American cultural form, the book reveals music video\'s roots in British and European film traditions, and suggests significant ways in which Br'
            },
        }, {
            kind: 'books#volume',
            id: 'nnYxEAAAQBAJ',
            etag: 'w42OHte6X5o',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/nnYxEAAAQBAJ',
            volumeInfo:
            {
                title: 'British Music Videos 1966 - 2016',
                subtitle: 'Genre, Authenticity and Art',
                authors: ['Caston Emily Caston'],
                imageLinks: {
                    smallThumbnail: 'https://www.shutterstock.com/shutterstock/photos/2105152760/display_1500/stock-vector--d-books-icon-for-web-design-isolated-education-and-online-class-concept-eps-vector-2105152760.jpg',
                    thumbnail: 'https://www.shutterstock.com/shutterstock/photos/2105152760/display_1500/stock-vector--d-books-icon-for-web-design-isolated-education-and-online-class-concept-eps-vector-2105152760.jpg',
                },
                description: 'Based on new archival evidence and interviews, and setting out a new theoretical framework for music video analysis, Emily Caston presents a major new analysis of music videos from 1966-2016, identifying not only their distinctive British traits, but their parallels with British film genres and styles. By analysing the genre, craft and authorial voice of music video within the context of film and popular music, the book sheds new light on existing theoretical and historical questions about audiences, authorship, art and the creative industries. Far from being an American cultural form, the book reveals music video\'s roots in British and European film traditions, and suggests significant ways in which Br'
            },
        },

    ]
}