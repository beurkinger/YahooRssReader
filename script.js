var categories =
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
    },
    printMenu : printMenu,
    //getRssUrl : getRssUrl
}      

var channel = function (title, url)
{
    this.title = title;
    this.url = url;
    this.itemsList = [];
    this.printChannel = printChannel;
};

var item = function (title, url, description, date, source, imgUrl)
{
    this.title = title;
    this.url = url;
    this.description = description;
    this.date = date;
    this.source = source;
    this.imgUrl = imgUrl;
    //this.printItem = printItem;
};

function printChannel()
{
    document.getElementById('header').getElementsByTagName('H1')[0].innerHTML = '<a href="'+this.url+'">'+this.title+'</a>';
    while (document.getElementById('body').firstChild)
    {
        document.getElementById('body').removeChild(document.getElementById('body').firstChild);
    }
    for (i=0; i < this.itemsList.length; i++)
    {
        var item = this.itemsList[i];
        var block = document.createElement('div');
        block.className = 'block';
        //block.setAttribute('onclick', 'showHiddenBlock('+i+')');
        //block.id = i;
        block.style.backgroundImage = 'url('+item.imgUrl+')';
        block.style.backgroundRepeat ='no-repeat';
        block.style.backgroundSize = 'cover';
        block.style.backgroundPosition = 'center';
        block.innerHTML = '<a class="hiddenBlock" href="'+item.url+'" id="'+i+'"><h3>'+item.title+'</h3><img src="'+item.imgUrl+'"/><date>'+item.date+'</date><aside>'+item.source+'</aside><article>'+item.description+'</article></a>'+ item.title;
        document.getElementById('body').appendChild(block);
        }
}

//function getRssUrl(category, subCategory)
//{
//    if (category === undefined)
//    {
//        return this['Une']['rssUrl'];
//    }
//    else
//    {
//        if (subCategory === undefined)
//        {
//            if (this[category])
//            {
//                return this[category]['rssUrl'];
//            }
//            else
//            {
//                return this['Une']['rssUrl'];    
//            }
//        }
//        else
//        {
//            if (this[category]['subCategories'][subCategory])
//            {
//                return this[category]['subCategories'][subCategory];
//            }
//            else
//            {
//                return this['Une']['rssUrl'];   
//            }
//        }
//    }
//}

function getChannel(rssUrl)
{
    var xlmUrl = 'getXML.php';
    if (rssUrl !== undefined && rssUrl !== '')
    {
        var xlmUrl = xlmUrl+'?url='+rssUrl;
    }
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", xlmUrl, false);
    xmlHttp.send();
    var xmlDoc = xmlHttp.responseXML;
    
    with (xmlDoc.getElementsByTagName('channel')[0])
    {
        var title = getElementsByTagName('title')[0].textContent;
        title = findTitle(title);
        var url = getElementsByTagName('link')[0].textContent;
    }
    
    var currentChannel = new channel(title, url);
    
    var items = xmlDoc.getElementsByTagName('channel')[0].getElementsByTagName('item');
    
    for (i=0; i < items.length; i++)
    {
        var title = items[i].getElementsByTagName('title')[0].textContent;
        var url = items[i].getElementsByTagName('link')[0].textContent;
        var date = items[i].getElementsByTagName('pubDate')[0].textContent;
        var description = items[i].getElementsByTagName('description')[0].textContent;
        description = findBody(description);
        if (items[i].getElementsByTagName('source')[0])
        {
            var source = items[i].getElementsByTagName('source')[0].textContent;
        }
        else
        {
            var source = '';
        }
        if (items[i].getElementsByTagNameNS('*', 'content')[0])
        {
            var imgUrl = items[i].getElementsByTagNameNS('*', 'content')[0].getAttribute('url');            
            imgUrl = findImgUrl(imgUrl);
        }
        else
        {
            var imgUrl='';
        }
        currentChannel.itemsList.push(new item(title, url, description, date, source, imgUrl));
    }
        return currentChannel;
}


//function createBlocks(n)
//{
//    for (i = 0; i < n; i++)
//    {
//        var block = document.createElement('div');
//        block.className = 'block';
//        block.id = i;
//        block.href = '#'+i;
//        document.getElementById('body').appendChild(block);
//    }
//}

function printMenu()
{
    for (var category in this)
    {
        if (this[category].hasOwnProperty('rssUrl'))
        {
            var li = document.createElement('li');
            li.innerHTML = '<a href="#" name="'+this[category].rssUrl+'" onclick="refresh(this)">'+category +'</a>';
            var subMenu = document.createElement('ul');
            subMenu.className = "subMenu";
            if (this[category].hasOwnProperty('subCategories'))
            {
                var subCategories = this[category].subCategories;
                for (var subCategory in subCategories)
                {
                    var subLi = document.createElement('li');
                    subLi.innerHTML = '<a href="#" name = "'+subCategories[subCategory]+'" onclick="refresh(this)">'+subCategory+'</a>';
                    subMenu.appendChild(subLi);
                }
                li.appendChild(subMenu);
            }
            document.getElementById('menu').appendChild(li);
        }
    }
}

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

//function showHiddenBlock(i)
//{
//    var hiddenBlock = document.getElementById(i);
//    hiddenBlock.classList.add('visible');
//    setTimeout(function()
//    {
//        document.getElementsByTagName('BODY')[0].setAttribute('onClick','removeHiddenBlock('+i+')');
//    }, 1);
//    
//}
//
//function removeHiddenBlock(i)
//{
//    var hiddenBlock = document.getElementById(i);
//    hiddenBlock.classList.remove('visible');
//    document.getElementsByTagName('BODY')[0].removeAttribute('onClick','removeHiddenBlock('+i+')');
//}

function refresh(a)
{
    link = a.name;
    var currentChannel = getChannel(link);
    currentChannel.printChannel();
}

function init()
{
    categories.printMenu();
    var currentChannel = getChannel();
    currentChannel.printChannel();
}

window.onload = init();

