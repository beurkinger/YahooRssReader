//Class Reader
function RssReader(rssUrl, title, url)
{
    this.menu = $('#menu');
    this.h1 = $('#header H1');
    this.body = $('#body');
    
    this.xmlUrl = 'getXML.php';
    this.rssUrl = rssUrl !== undefined ? rssUrl : '';
    this.title = title;
    this.url = url;
    this.itemsList = [];
    
    this.categories = 
    {
        'Une' :
        {
            rssUrl : 'https://fr.news.yahoo.com/?format=rss'
        },
        'Monde' :
        {
            rssUrl : 'https://fr.news.yahoo.com/rss/world',
            subCategories :
                {
                    'Afrique' : 'https://fr.news.yahoo.com/rss/afrique',
                    'Amérique du Nord' : 'https://fr.news.yahoo.com/rss/amerique-du-nord',
                    'Amérique Latine' : 'https://fr.news.yahoo.com/rss/amerique-latine',
                    'Asie' : 'https://fr.news.yahoo.com/rss/asie',
                    'Europe' : 'https://fr.news.yahoo.com/rss/europe',
                    'Moyen Orient' : 'https://fr.news.yahoo.com/rss/moyen-orient'
                }
        },
        'France' :
        {
            rssUrl : 'https://fr.news.yahoo.com/rss/france',
            subCategories :
                {
                    'Justice' : 'https://fr.news.yahoo.com/rss/justice',
                    'Faits Divers' : 'https://fr.news.yahoo.com/rss/faits-divers',
                    'Emploi' : 'https://fr.news.yahoo.com/rss/emploi',
                    'Société' : 'https://fr.news.yahoo.com/rss/societe'
                }
        },
        'Politique' :
        {
            rssUrl : 'https://fr.news.yahoo.com/rss/politique',
            subCategories :
                {
                    'Extrême Gauche' : 'https://fr.news.yahoo.com/rss/extreme-gauche',
                    'PS' : 'https://fr.news.yahoo.com/rss/ps',
                    'Écologistes' : 'https://fr.news.yahoo.com/rss/ecologistes',
                    'Centristes' : 'https://fr.news.yahoo.com/rss/centristes',
                    'UMP' : 'https://fr.news.yahoo.com/rss/ump',
                    'Extrême droite' : 'https://fr.news.yahoo.com/rss/extreme-droite'
                }
        },
        'Économie' :
        {
            rssUrl : 'https://fr.news.yahoo.com/rss/economie',
            subCategories :
                {
                    'Banques & assurances' : 'https://fr.news.yahoo.com/rss/banques',
                    'Bourse' : 'https://fr.news.yahoo.com/rss/bourse',
                    'Énergie' : 'https://fr.news.yahoo.com/rss/energie',
                    'Finances publiques' : 'https://fr.news.yahoo.com/rss/finances-publiques',
                    'Monnaie' : 'https://fr.news.yahoo.com/rss/monnaies'
                }
        },
        'Insolite' :
        {
            rssUrl : 'https://fr.news.yahoo.com/rss/insolite',
            subCategories :
                {
                    'Top Articles' : 'https://fr.news.yahoo.com/rss/insolites--top-articles',
                    'Animaux insolites' : 'https://fr.news.yahoo.com/rss/animaux-insolites',
                    'Amours insolites' : 'https://fr.news.yahoo.com/rss/amours-insolites',
                    'Finances publiques' : 'https://fr.news.yahoo.com/rss/finances-publiques',
                    'Cartoons' : 'https://fr.news.yahoo.com/rss/cartoons'
                }
        },
        'People' :
        {
            rssUrl : 'https://fr.news.yahoo.com/rss/people',
            subCategories :
                {
                    'Closer' : 'https://fr.news.yahoo.com/rss/closer',
                    'Gala' : 'https://fr.news.yahoo.com/rss/gala',
                    'Premiere' : 'https://fr.news.yahoo.com/rss/premiere',
                    'Pure People' : 'https://fr.news.yahoo.com/rss/pure-people',
                    'Voici' : 'https://fr.news.yahoo.com/rss/voici',
                    'Wenn' : 'https://fr.news.yahoo.com/rss/wenn'
                }
        },
        'Technologies' :
        {
            rssUrl : 'https://fr.news.yahoo.com/rss/technologies',
            subCategories :
                {
                    'Hardware' : 'https://fr.news.yahoo.com/rss/hardware',
                    'Internet' : 'https://fr.news.yahoo.com/rss/internet',
                    'Jeux vidéos' : 'https://fr.news.yahoo.com/rss/jeux-video',
                    'Logiciels' : 'https://fr.news.yahoo.com/rss/logiciels',
                    'Telecoms' : 'https://fr.news.yahoo.com/rss/telecoms'
                }
        },
        'Sports' :
        {
            rssUrl : 'https://fr.news.yahoo.com/rss/sports',
            subCategories :
                {
                    'Cyclisme' : 'https://fr.news.yahoo.com/rss/cyclisme',
                    'Football' : 'https://fr.news.yahoo.com/rss/football',
                    'Formule 1' : 'https://fr.news.yahoo.com/rss/formule-1',
                    'Rugby' : 'https://fr.news.yahoo.com/rss/rugby',
                    'Tennis' : 'https://fr.news.yahoo.com/rss/tennis'
                }
        },
        'Sciences' :
        {
            rssUrl : 'https://fr.news.yahoo.com/rss/sciences',
            subCategories :
                {
                    'Catastrophes naturelles' : 'https://fr.news.yahoo.com/rss/catastrophes-naturelles',
                    'Environnement' : 'https://fr.news.yahoo.com/rss/environnement',
                    'Espace' : 'https://fr.news.yahoo.com/rss/espace',
                    'Météo' : 'https://fr.news.yahoo.com/rss/meteo',
                    'Nucléaire' : 'https://fr.news.yahoo.com/rss/nucleaire'
                }
        },
        'Culture / Médias' :
        {
            rssUrl : 'https://fr.news.yahoo.com/rss/culture-medias',
            subCategories :
                {
                    'Cinéma' : 'https://fr.news.yahoo.com/rss/cinema',
                    'Livres' : 'https://fr.news.yahoo.com/rss/livres',
                    'Mode' : 'https://fr.news.yahoo.com/rss/mode',
                    'Musique' : 'https://fr.news.yahoo.com/rss/musique',
                    'Presse écrite' : 'https://fr.news.yahoo.com/rss/presse-ecrite',
                    'Télé et radios' : 'https://fr.news.yahoo.com/rss/tele-radios'
                }
        }
    }; 
};

RssReader.prototype.init = function()
{
    this.printMenu();
    this.getChannel();
};

RssReader.prototype.printMenu = function()
{
    var self = this;
    var categories = this.categories;
    
    for (var category in categories)
    {
        if (categories[category].hasOwnProperty('rssUrl'))
        {
            var li = $('<li></li>').append('<a href="#" name="'+categories[category]['rssUrl']+'">'+category +'</a>');
            if (categories[category].hasOwnProperty('subCategories'))
            {
                var subMenu = $('<ul class="subMenu"></ul>');
                var subCategories = categories[category]['subCategories'];
                for (var subCategory in subCategories)
                {
                    var subLi = $('<li></li>').append('<a href="#" name = "'+subCategories[subCategory]+'">'+subCategory+'</a>');
                    subMenu.append(subLi);
                }
                li.append(subMenu);
            }
            this.menu.append(li);
        }
    }
    
    this.menu.find('a').click(function()
    {
        self.rssUrl = $(this).attr('name');
        self.getChannel();
        return false;
    });
};

RssReader.prototype.getChannel = function()
{
    var self = this;
    
    $.ajax(
    {
        url: self.xmlUrl,
        type: 'GET',
        cache: true,
        data: { url : self.rssUrl },
        dataType : 'xml'
    })
    .done(function(xmlDoc)
    {
        var title = $(xmlDoc).find('channel > title').html();
        self.title = findTitle(title);
        self.url = $(xmlDoc).find('channel > link').html();
        self.itemsList = [];
        
        $(xmlDoc).find('channel item').each(function()
        {
            var title = $(this).find('title').text();
            var url = $(this).find('link').text();
            var date = $(this).find('pubDate').text();
            var description = $(this).find('description').text();
            description = description !== undefined ? findBody(description) : '';
            var source = $(this).find('source').text();
            var imgUrl =  $(this).find('content').attr('url');
            imgUrl = imgUrl !== undefined ? findImgUrl(imgUrl) : '';
            self.itemsList.push(new item(title, url, description, date, source, imgUrl));
        });
        self.printChannel();
    })
    .fail(function(jqXHR, errorMessage)
    {
        console.log('Erreur : '+errorMessage);
    });
    
};

RssReader.prototype.printChannel = function()
{
    this.h1.html('<a href="'+this.url+'">'+this.title+'</a>');
    this.body.empty();
    for (i=0; i < this.itemsList.length; i++)
    {
        var item = this.itemsList[i];
        var block = document.createElement('div');
        block.className = 'block';
        block.style.backgroundImage = 'url('+item.imgUrl+')';
        block.style.backgroundRepeat ='no-repeat';
        block.style.backgroundSize = 'cover';
        block.style.backgroundPosition = 'center';
        block.innerHTML = '<a class="hiddenBlock" href="'+item.url+'" id="'+i+'"><h3>'+item.title+'</h3><img src="'+item.imgUrl+'"/><date>'+item.date+'</date><aside>'+item.source+'</aside><article>'+item.description+'</article></a>'+ item.title;
        document.getElementById('body').appendChild(block);
    }
};

var item = function (title, url, description, date, source, imgUrl)
{
    this.title = title;
    this.url = url;
    this.description = description;
    this.date = date;
    this.source = source;
    this.imgUrl = imgUrl;
};

function findTitle(text)
{
    var regEx = /(?:News)\s(.*)\s(?:\|)/
    var title = text.match(regEx);
    if (title)
    {
        
        return title[1];
    }
    else
    {
        var regEx = /(.*)\s(?:\|)/
        var title = text.match(regEx);
        if (title)
        {
            return title[1];
        }
        else
        {
            return 'Yahoo Actualités';
        }
    }
}
    

function findImgUrl(url)
{
    var regEx = /(?:http:\/\/|https:\/\/)(?:.*)((http:\/\/|https:\/\/)(.*))/;
    var imgUrl = url.match(regEx);
    if (imgUrl)
    {
        
        return imgUrl[1]; 
    }
    return url;   
}

function findBody(text)
{
    var regEx = /(?:(?:<p>)?(?:.*)(?:<\/a>))(.*)(?:<\/p>)?/;
    var body = text.match(regEx);
    if (body)
    {
        return body[1];
    }
    else
    {
        return text;
    }
}

