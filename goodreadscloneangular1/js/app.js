var goodreadapp = angular.module('goodreads', ['ngRoute']);
var bigdata = {};
var userlist = [];
goodreadapp.config(function ($routeProvider) {
    $routeProvider.
    when("/review/:param1", {
        templateUrl: 'partials/reviewpage.htm',
        controller: 'ReviewController',
        controllerAs: 'review'

    }).when("/", {
        templateUrl: 'partials/homepage.htm',
        controller: 'InitController',
        controllerAs: 'init'
    }).when("/reviewers", {
        templateUrl: 'partials/reviwerpage.htm',
        controller: 'ReviewerController',
        controllerAs: 'reviewercontroller'
    }).when("/shelf/:param1", {
        templateUrl: 'partials/shelfpage.htm',
        controller: 'ShelfController',
        controllerAs: 'shelf'
    })
});

goodreadapp.factory("JsonFactory", function ($http) {
    var book = data;
    var factory = {};
    factory.getBooks = function () {
        return book;
    };
    factory.putreviews = function (noofreviews) {
        if (bigdata[noofreviews.bookid] != null) {
            bigdata[noofreviews.bookid] = bigdata[noofreviews.bookid] + noofreviews.noofreviews;
        } else {
            bigdata[noofreviews.bookid] = noofreviews.noofreviews;
        }

    };
    return factory;
});

goodreadapp.controller('ReviewerController', function (JsonFactory) {

    booklist = JsonFactory.getBooks();
    angular.forEach(booklist, function (value, key) {
        angular.forEach(userlist, function (value1, key1) {
            if (value1.bookid === value.bookid) {
                value1.title = value.title;
                value1.author = value.author;
                value1.thumbnail = value.thumbnail;
                value1.rating = value.rating;
                value1.noofpages = value.noofpages;
            }
        });
    });
    this.reviewerdata = userlist;
});


goodreadapp.controller('ReviewController', ['$scope', '$routeParams', function ($scope, $routeParams) {
    var param1 = $routeParams.param1;
    $scope.test = param1;
    var review = this;
    angular.forEach(data, function (value, key) {
        if (value.bookid === param1) {
            review.book = value;
            review.numberofratings = 0;
        }
    });

}]);

goodreadapp.controller('ShelfController', ['$scope', '$routeParams', function ($scope, $routeParams) {
    var param1 = $routeParams.param1;
    var shelf = this;
    shelf.status = status1;
    shelf.userstatus = {};
    angular.forEach(data, function (value, key) {
        if (value.bookid === param1) {
            shelf.book = value;
            shelf.numberofratings = 0;

        }
    });
    shelf.storestatus = function (bookid) {
        this.userstatus.bookid = bookid;
        userlist.push(this.userstatus);
        this.userstatus = {};
    };
}]);

goodreadapp.controller('FormController', function (JsonFactory) {

    this.reviewuserprovided = {};
    this.addReview = function (reviews1, review, bookid) {
        reviews1.push(this.reviewuserprovided);
        userlist.push(this.reviewuserprovided.reviewer);
        this.reviewuserprovided = {};
        review.numberofratings = review.numberofratings + 1;
        var returnobject = {};
        returnobject.bookid = bookid;
        returnobject.noofreviews = review.numberofratings
        JsonFactory.putreviews(returnobject);
    };
});

goodreadapp.controller("InitController", function (JsonFactory) {
    this.books = JsonFactory.getBooks();
    this.stuff = bigdata;
    var gridviewer = this;
    this.isGridView = true;
    gridviewer.gridbooklist = [];
    var gridbook = [];
    angular.forEach(this.books, function (value, key) {
        if (bigdata[value.bookid] != null) {
            value.noofreviews = bigdata[value.bookid];
        }

        gridbook.push(value);

        if (gridbook.length === 3) {
            gridviewer.gridbooklist.push(gridbook);
            gridbook = [];
        }
    });
    gridviewer.gridbooklist.push(gridbook);
    gridviewer.isGridViewOn = function () {
        if (gridviewer.isGridView === true) {
            gridviewer.isGridView = false;
        } else {
            gridviewer.isGridView = true;
        }

    };
});

goodreadapp.controller("RedirectController", function () {

});
var status1 = [{
    option: 'is currently reading'
}, {
    option: 'finished reading'
}, {
    option: 'wants to read'
}];
var data = [
    {
        bookid: '153',
        title: 'Anna Karenina',
        author: 'Leo Tolstoy',
        ISBN: '0140449175',
        rating: '4.01',
        noofreviews: '0',
        noofpages: '817',
        description: 'Anna Karenina seems to have everything - beauty, wealth, popularity and an adored son. But she feels that her life is empty until the moment she encounters the impetuous officer Count Vronsky. Their subsequent affair scandalizes society and family alike and soon brings jealously and bitterness in its wake. Contrasting with this tale of love and self-destruction is the vividly observed story of Levin, a man striving to find contentment and a meaning to his life - and also a self-portrait of Tolstoy himself.',
        thumbnail: '153.jpg',
        review: [{
            reviewer: 'Jon Doe',
            rating: '4',
            review: 'One of the best books of the author',
            revieweremail: 'jondoe@gmail.com'
        }]
},
    {
        bookid: '163',
        title: 'The Untouchable',
        author: 'John Banville',
        ISBN: '0679767479',
        rating: '3.97',
        noofreviews: '0',
        noofpages: '367',
        description: 'One of the most dazzling and adventurous writers now working in English takes on the enigma of the Cambridge spies in a novel of exquisite menace, biting social comedy, and vertiginous moral complexity. The narrator is the elderly Victor Maskell, formerly of British intelligence, for many years art expert to the Queen. Now he has been unmasked as a Russian agent and subjected to a disgrace that is almost a kind of death. But at whose instigation?<br/',
        thumbnail: '163.jpg',
        review: [{
            reviewer: 'Jon Doe',
            rating: '4',
            review: 'One of the best books of the author',
            revieweremail: 'jondoe@gmail.com'
        }]
},
    {
        bookid: '249',
        title: 'Tropic of Cancer',
        author: 'Henry Miller',
        ISBN: '0802131786',
        rating: '3.71',
        noofreviews: '0',
        noofpages: '318',
        description: 'Only a historic court ruling that changed American censorship standards, ushering in a new era of freedom and frankness in modern literature, permitted the publication of this first volume of Miller’s famed mixture of memoir and fiction, which chronicles with unapologetic gusto the bawdy adventures of a young expatriate writer, his friends, and the characters they meet in Paris in the 1930s.<br/',
        thumbnail: '249.jpg',
        review: [{
            reviewer: 'Jon Doe',
            rating: '4',
            review: 'One of the best books of the author',
            revieweremail: 'jondoe@gmail.com'
        }]
},
    {
        bookid: '320',
        title: 'One Hundred Years of Solitude',
        author: 'Gabriel García Márquez',
        ISBN: '0060531045',
        rating: '4.03',
        noofreviews: '0',
        noofpages: '457',
        description: 'Love and lust, war and revolution, riches and poverty, youth and senility -- the variety of life, the endlessness of death, the search for peace and truth -- these universal themes dominate the novel. Whether he is describing an affair of passion or the voracity of capitalism and the corruption of government, Gabriel Garcia Marquez always writes with the simplicity, ease, and purity that are the mark of a master.<br/',
        thumbnail: '320.jpg',
        review: [{
            reviewer: 'Jon Doe',
            rating: '4',
            review: 'One of the best books of the author',
            revieweremail: 'jondoe@gmail.com'
        }]
},
    {
        bookid: '378',
        title: 'The Phantom Tollbooth',
        author: 'Norton Juster',
        ISBN: '0394820371',
        rating: '4.22',
        noofreviews: '0',
        noofpages: '256',
        description: 'For Milo, everything’s a bore. When a tollbooth mysteriously appears in his room, he drives through only because he’s got nothing better to do. But on the other side, things seem different. Milo visits the Island of Conclusions (you get there by jumping), learns about time from a ticking watchdog named Tock, and even embarks on a quest to rescue Rhyme and Reason! Somewhere along the way, Milo realizes something astonishing. Life is far from dull. In fact, it’s exciting beyond his wildest dreams. . . .',
        thumbnail: '378.jpg',
        review: [{
            reviewer: 'Jon Doe',
            rating: '4',
            review: 'One of the best books of the author',
            revieweremail: 'jondoe@gmail.com'
        }]
},
    {
        bookid: '431',
        title: 'The New York Trilogy',
        author: 'Paul Auster',
        ISBN: '0143039830',
        rating: '3.92',
        noofreviews: '0',
        noofpages: '308',
        description: '; haunting and mysterious tales that move at the breathless pace of a thriller.',
        thumbnail: '431.jpg',
        review: [{
            reviewer: 'Jon Doe',
            rating: '4',
            review: 'One of the best books of the author',
            revieweremail: 'jondoe@gmail.com'
        }]
},
    {
        bookid: '475',
        title: 'Collapse: How Societies Choose to Fail or Succeed',
        author: 'Jared Diamond',
        ISBN: '0143036556',
        rating: '3.91',
        noofreviews: '0',
        noofpages: '608',
        description: 'Bringing together new evidence from a startling range of sources and piecing together the myriad influences, from climate to culture, that make societies self-destruct, Jared Diamond',
        thumbnail: '475.jpg',
        review: [{
            reviewer: 'Jon Doe',
            rating: '4',
            review: 'One of the best books of the author',
            revieweremail: 'jondoe@gmail.com'
        }]
},
    {
        bookid: '536',
        title: 'The Lovely Bones',
        author: 'Alice Sebold',
        ISBN: '',
        rating: '3.76',
        noofreviews: '0',
        noofpages: '327',
        description: 'On her way home from school on a snowy December day in 1973, 14-year-old Susie Salmon ("like the fish") is lured into a makeshift underground den in a cornfield and brutally raped and murdered, the latest victim of a serial killer--the man she knew as her neighbor, Mr. Harvey.',
        thumbnail: '536.jpg',
        review: [{
            reviewer: 'Jon Doe',
            rating: '4',
            review: 'One of the best books of the author',
            revieweremail: 'jondoe@gmail.com'
        }]
},
    {
        bookid: '656',
        title: 'War and Peace',
        author: 'Leo Tolstoy',
        ISBN: '0192833987',
        rating: '4.10',
        noofreviews: '0',
        noofpages: '1392',
        description: 'Tolstoy\'s epic masterpiece intertwines the lives of private and public individuals during the time of the Napoleonic wars and the French invasion of Russia. The fortunes of the Rostovs and the Bolkonskys, of Pierre, Natasha, and Andrei, are intimately connected with the national history that is played out in parallel with their lives. Balls and soirees alternate with councils of war and the machinations of statesmen and generals, scenes of violent battles with everyday human passions in a work whose extraordinary imaginative power has never been surpassed. <br/',
        thumbnail: '656.jpg',
        review: [{
            reviewer: 'Jon Doe',
            rating: '4',
            review: 'One of the best books of the author',
            revieweremail: 'jondoe@gmail.com'
        }]
},
    {
        bookid: '662',
        title: 'Atlas Shrugged',
        author: 'Ayn Rand',
        ISBN: '0452011876',
        rating: '3.67',
        noofreviews: '0',
        noofpages: '1168',
        description: 'Tremendous in its scope, this novel presents an astounding panorama of human life — from the productive genius who becomes a worthless playboy — to the great steel industrialist who does not know that he is working for his own destruction — to the philosopher who becomes a pirate — to the composer who gives up his career on the night of his triumph — to the woman who runs a transcontinental railroad — to the lowest track worker in her Terminal tunnels. <br/',
        thumbnail: '662.jpg',
        review: [{
            reviewer: 'Jon Doe',
            rating: '4',
            review: 'One of the best books of the author',
            revieweremail: 'jondoe@gmail.com'
        }]
},
    {
        bookid: '865',
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        ISBN: '0061122416',
        rating: '3.80',
        noofreviews: '0',
        noofpages: '197',
        description: 'Paulo Coelho\'s enchanting novel has inspired a devoted following around the world. This story, dazzling in its powerful simplicity and inspiring wisdom, is about an Andalusian shepherd boy named Santiago who travels from his homeland in Spain to the Egyptian desert in search of a treasure buried in the Pyramids. Along the way he meets a Gypsy woman, a man who calls himself king, and an alchemist, all of whom point Santiago in the direction of his quest. No one knows what the treasure is, or if Santiago will be able to surmount the obstacles along the way. But what starts out as a journey to find worldly goods turns into a discovery of the treasure found within. Lush, evocative, and deeply humane, the story of Santiago is an eternal testament to the transforming power of our dreams and the importance of listening to our hearts.',
        thumbnail: '865.jpg',
        review: [{
            reviewer: 'Jon Doe',
            rating: '4',
            review: 'One of the best books of the author',
            revieweremail: 'jondoe@gmail.com'
        }]
},
    {
        bookid: '890',
        title: 'Of Mice and Men',
        author: 'John Steinbeck',
        ISBN: '0142000671',
        rating: '3.83',
        noofreviews: '0',
        noofpages: '112',
        description: 'The compelling story of two outsiders striving to find their place in an unforgiving world. Drifters in search of work, George and his simple-minded friend Lennie have nothing in the world except each other and a dream--a dream that one day they will have some land of their own. Eventually they find work on a ranch in California’s Salinas Valley, but their hopes are doomed as Lennie, struggling against extreme cruelty, misunderstanding and feelings of jealousy, becomes a victim of his own strength. Tackling universal themes such as the friendship of a shared vision, and giving voice to America’s lonely and dispossessed, <i',
        thumbnail: '890.jpg',
        review: [{
            reviewer: 'Jon Doe',
            rating: '4',
            review: 'One of the best books of the author',
            revieweremail: 'jondoe@gmail.com'
        }]
},
    {
        bookid: '930',
        title: 'Memoirs of a Geisha',
        author: 'Arthur Golden',
        ISBN: '0739326228',
        rating: '4.07',
        noofreviews: '0',
        noofpages: '434',
        description: ', we enter a world where appearances are paramount; where a girl\'s virginity is auctioned to the highest bidder; where women are trained to beguile the most powerful men; and where love is scorned as illusion. It is a unique and triumphant work of fiction - at once romantic, erotic, suspenseful - and completely unforgettable.',
        thumbnail: '930.jpg',
        review: [{
            reviewer: 'Jon Doe',
            rating: '4',
            review: 'One of the best books of the author',
            revieweremail: 'jondoe@gmail.com'
        }]
},
    {
        bookid: '960',
        title: 'Angels & Demons  (Robert Langdon, #1)',
        author: 'Dan Brown',
        ISBN: '1416524797',
        rating: '3.84',
        noofreviews: '0',
        noofpages: '713',
        description: 'When world-renowned Harvard symbologist Robert Langdon is summoned to a Swiss research facility to analyze a mysterious symbol—seared into the chest of a murdered physicist—he discovers evidence of the unimaginable: the resurgence of an ancient secret brotherhood known as the Illuminati ... the most powerful underground organization ever to walk the earth. The Illuminati has now surfaced to carry out the final phase of its legendary vendetta against its most hated enemy—the Catholic Church. <br/',
        thumbnail: '960.jpg',
        review: [{
            reviewer: 'Jon Doe',
            rating: '4',
            review: 'One of the best books of the author',
            revieweremail: 'jondoe@gmail.com'
        }]
},
    {
        bookid: '968',
        title: 'The Da Vinci Code (Robert Langdon, #2)',
        author: 'Dan Brown',
        ISBN: '0307277674',
        rating: '3.77',
        noofreviews: '0',
        noofpages: '481',
        description: 'While in Paris, Harvard symbologist Robert Langdon is awakened by a phone call in the dead of the night. The elderly curator of the Louvre has been murdered inside the museum, his body covered in baffling symbols. As Langdon and gifted French cryptologist Sophie Neveu sort through the bizarre riddles, they are stunned to discover a trail of clues hidden in the works of Leonardo da Vinci—clues visible for all to see and yet ingeniously disguised by the painter.<br/',
        thumbnail: '968.jpg',
        review: [{
            reviewer: 'Jon Doe',
            rating: '4',
            review: 'One of the best books of the author',
            revieweremail: 'jondoe@gmail.com'
        }]
},
    {
        bookid: '976',
        title: 'Deception Point',
        author: 'Dan Brown',
        ISBN: '0671027387',
        rating: '3.65',
        noofreviews: '0',
        noofpages: '556',
        description: 'When a new NASA satellite spots evidence of an astonishingly rare object buried deep in the Arctic ice, the floundering space agency proclaims a much-needed victory...a victory that has profound implications for U.S. space policy and the impending presidential election. With the Oval Office in the balance, the President dispatches White House Intelligence analyst Rachel Sexton to the Milne Ice Shelf to verify the authenticity of the find. Accompanied by a team of experts, including the charismatic academic Michael Tolland, Rachel uncovers the unthinkable: evidence of scientific trickery -- a bold deception that threatens to plunge the world into controversy.<br/',
        thumbnail: '976.jpg',
        review: [{
            reviewer: 'Jon Doe',
            rating: '4',
            review: 'One of the best books of the author',
            revieweremail: 'jondoe@gmail.com'
        }]
}
];
