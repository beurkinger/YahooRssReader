//Classe Reader
function RssReader(rssUrl, title, url)
{
    //Containeurs du menu, du titre, et du corps de la page
    this.menu = $('#menu');
    this.menuButton = $('#menu-button');
    this.menuContent = $('#menu-content');
    this.pageTitle = $('#header-title');
    this.paperBox = $('#paper-box');
//    this.leftColumn = $('#column-left', this.paperBox);
//    this.rightColumn = $('#column-right', this.paperBox);
    
    //Fichier php permettant de récupérer le flux rss, url du flux en question,
    //titre de la rubtrique, url de la rubrique sur le site Yahoo, liste des 
    //articles de la rubrique
    this.xmlUrl = 'getXML.php';
    this.rssUrl = rssUrl !== undefined ? rssUrl : '';
    this.title = title;
    this.url = url;
    this.itemsList = [];
    
    //Liste des rubriques et sous rubriques, avec le lien des fluxs rss associés
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

//Méthode permettant d'initialiser le reader
RssReader.prototype.init = function()
{
    this.initMenu();
    this.getChannel();
};

//Méthode permettant de construirele menu
RssReader.prototype.initMenu = function()
{
    var self = this;
    var categories = this.categories;
    
    for (var category in categories)
    {
        if (categories[category].hasOwnProperty('rssUrl'))
        {
            var li = $('<li></li>').append('<a href="#" rssUrl="'+categories[category]['rssUrl']+'">'+category +'</a>');
            if (categories[category].hasOwnProperty('subCategories'))
            {
                var subMenu = $('<ul class="subMenu"></ul>');
                var subCategories = categories[category]['subCategories'];
                for (var subCategory in subCategories)
                {
                    var subLi = $('<li></li>').append('<a href="#" rssUrl = "'+subCategories[subCategory]+'">'+subCategory+'</a>');
                    subMenu.append(subLi);
                }
                li.append(subMenu);
            }
            this.menuContent.append(li);
        }
    }
    
    this.menuContent.find('a').click(function()
    {
        self.rssUrl = $(this).attr('rssUrl');
        self.getChannel();
        return false;
    });
    
    this.menuButton.click(function()
    {
        if (self.menuContent.hasClass('menu-open'))
        {
            self.menuContent.removeClass('menu-open').addClass('menu-close').delay(200);
        }
        else
        {
            self.menuContent.removeClass('menu-close').addClass('menu-open');
        }
        return false;
    });
    
    this.menuContent.hover(function()
    {
        self.menuContent.removeClass('menu-open');
    });
};

//Méthode permettant de récupérer et de filter le flux RSS d'une rubrique
RssReader.prototype.getChannel = function()
{
    var self = this;
    this.paperBox.html('<div id="spinner"><i class="fa fa-circle-o-notch fa-spin"></i></div>');
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
        var channel = $(xmlDoc).find('channel');
        var title = channel.find('title').first().text();
        self.title = self.findTitle(title);
        self.url = channel.find('link').first().text();
        self.itemsList = [];
        
        $(xmlDoc).find('channel item').each(function()
        {
            var title = $(this).find('title').text();
            var url = $(this).find('link').text();
            var date = $(this).find('pubDate').text();
            var description = $(this).find('description').text();
            description = $('<div>'+description+'</div>').text();
            var source = $(this).find('source').text();
            var sourceUrl = $(this).find('source').attr('href');
            var imgUrl =  $(this).find('content').attr('url');
            imgUrl = imgUrl !== undefined ? self.findImgUrl(imgUrl) : '';
            self.itemsList.push(new item(title, url, description, date, source, sourceUrl, imgUrl));
        });
        self.printChannel();
    })
    .fail(function(jqXHR, errorMessage)
    {
        console.log('Erreur : '+errorMessage);
    });
    
};

//Méthode permettant d'afficher une rubrique
RssReader.prototype.printChannel = function()
{
    var self = this;
    this.pageTitle.html('<a href="'+this.url+'">'+this.title+'</a>');
    var leftBuffer = $('<div></div>').attr('id', 'column-left');
    var rightBuffer = $('<div></div>').attr('id', 'column-right');
    for (i=0; i < self.itemsList.length; i++)
    {
        isOdd = i % 2;
        if (!isOdd)
        {
            leftBuffer.append(self.itemsList[i].getHtml());
        }
        else
        {
            rightBuffer.append(self.itemsList[i].getHtml());
        }
    }
    self.paperBox.fadeOut(400, function()
    {
        $(this).html('').append(leftBuffer)
                        .append(rightBuffer)
                        .append('<div class="clear"></div>')
                        .slideDown(400);
    });

};

//Méthode permettant de filter le titre d'un article
RssReader.prototype.findTitle = function(text)
{
    var regEx = /(?:News)\s(.*)\s(?:\|)/
    var title = text.match(regEx);
    if (title)
    {
        
        return title[1];
    }
    var regEx = /(.*)\s(?:\|)/
    var title = text.match(regEx);
    if (title)
    {
        return title[1];
    }
    return 'Yahoo Actualités';
};

//Méthode permettant de filtrer l'url de l'image d'un article
RssReader.prototype.findImgUrl = function(url)
{
    var regEx = /(?:http:\/\/|https:\/\/)(?:.*)((http:\/\/|https:\/\/)(.*))/;
    var imgUrl = url.match(regEx);
    if (imgUrl)
    {
        
        return imgUrl[1]; 
    }
    return url;   
};

//Classe représentant un article
function item(title, url, description, date, source, sourceUrl, imgUrl)
{
    this.title = title;
    this.url = url;
    this.description = description;
    this.date = new Date(date);
    this.source = source;
    this.sourceUrl = sourceUrl;
    this.imgUrl = imgUrl;
};

item.prototype.getDateString = function()
{
    var today = new Date();
    
    if(this.date.getDate() === today.getDate())
    {
        var diff = parseInt((today.getTime() - this.date.getTime()) / (1000 * 60));
        if (diff <= 60)
        {
            return 'il y a '+diff+' minutes';
        }
        else
        {
            var hours = Math.floor(diff / 60);
            var minutes = diff % 60;
            var s1 = hours > 1 ? 's' : '';
            var s2 = minutes > 1 ? 's' : '';
            return 'il y a '+hours+' heure'+s1+' et '+minutes+' minute'+s2;
        }
    }
    
    if ((this.date.getDay() + 1 === today.getDay()) 
            || (this.date.getDay() === 6 && today.getDay() === 0))
    {
        return 'hier, '+this.date.getHours()+':'+this.date.getMinutes();
    }
    else
    {
        var days =      ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 
                        'vendredi', 'samedi'];
        var months =    ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 
                        'juillet', 'août', 'septembre', 'octobre', 'novembre', 
                        'décembre'];
        return  days[this.date.getDay()]+' '+this.date.getDate()+' '
                +months[this.date.getMonth()];
    }
};

item.prototype.getHtml = function()
{
    var paper =     $(document.createElement('div'))
                    .addClass('paper');
    
    var hidden =    $(document.createElement('div'))
                    .addClass('paper-hidden')
                    .html('<img src="'+this.imgUrl+'"/>');
    
    var left =      $(document.createElement('div'))
                    .addClass('paper-left');
    
    var image =     $(document.createElement('div'))
                    .addClass('paper-image')
                    .css('backgroundImage','url('+this.imgUrl+')')
                    .css('backgroundRepeat', 'no-repeat')
                    .css('backgroundSize', 'cover')
                    .css('backgroundPosition', 'center');
    
    var link =      $(document.createElement('div'))
                    .addClass('paper-link')
                    .html('<a href="'+this.url+'" target="_blank">Voir l\'article</a>');
    
    var title =     $(document.createElement('div'))
                    .addClass('paper-title')
                    .html('<a href="this.url" target="_blank">'+this.title+'</a>');
    
    var date =   $(document.createElement('div'))
                    .addClass('paper-date')
                    .html(this.getDateString()); 
    
    var content =   $(document.createElement('div'))
                    .addClass('paper-content')
                    .html(this.description); 
            
    var source =    $(document.createElement('div'))
                    .addClass('paper-source')
                    .html('Source : <a href="'+this.sourceUrl+'">'+this.source+'</a>'); 
    
    left            .append(image)
                    .append(link);
    
    paper           .append(hidden)
                    .append(left)
                    .append(title)
                    .append(date)
                    .append(content)
                    .append(source);
            
    image.click(function()
    {
        hidden.addClass('paper-hidden-display');
        return false;
    });
    
    hidden.click(function()
    {
        hidden.removeClass('paper-hidden-display');
        return false;
    });
    
    return paper;
};
