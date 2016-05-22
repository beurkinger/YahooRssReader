//Classe Reader
function RssReader(rssUrl, title, url)
{
    //Containeurs du menu, du titre, et du corps de la page
    this.menu = $('#menu');
    this.menuButton = $('#menu-button');
    this.menuBg = $('#menu-bg');
    this.menuContent = $('#menu-content');
    this.pageTitle = $('#page-title');
    this.paperBox = $('#paper-box');
    
    //Fichier php permettant de récupérer le flux rss, url du flux en question,
    //titre de la rubtrique, url de la rubrique sur le site Yahoo, liste des 
    //articles de la rubrique
    this.xmlUrl = 'getXML.php';
    this.categoriesUrl = 'data/categories.json'
    this.rssUrl = rssUrl !== undefined ? rssUrl : '';
    this.title = title;
    this.url = url;
    this.itemsList = [];
    this.categories = {};

    this.loadingMessage = "Chargement";
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

    $.ajax(
    {
        url: self.categoriesUrl,
        type: 'GET',
        cache: true,
        dataType : 'json'
    })
    .done(function(json)
    {
        self.categories = json;
        var categories = self.categories;
        console.log(categories);
        for (var category in categories)
        {
            if (categories[category].hasOwnProperty('rssUrl'))
            {
                var li = $('<li class="menu-item"></li>').append('<a href="#" rssUrl="'+categories[category]['rssUrl']+'">'+category +'</a>');
                if (categories[category].hasOwnProperty('subCategories'))
                {
                    var subMenu = $('<ul class="submenu"></ul>');
                    var subCategories = categories[category]['subCategories'];
                    for (var subCategory in subCategories)
                    {
                        var subLi = $('<li class="submenu-item"></li>').append('<a href="#" rssUrl = "'+subCategories[subCategory]+'">'+subCategory+'</a>');
                        subMenu.append(subLi);
                    }
                    li.append(subMenu);
                }
                self.menuContent.append(li);
            }
        }
        self.menuContent.find('a').click(function()
        {
            self.rssUrl = $(this).attr('rssUrl');
            self.getChannel();
            return false;
        });

        self.menuContent.find('.menu-item').click(function()
        {
            $(this).toggleClass('menu-item-open');
            return false;
        });

        self.menuContent.find('.submenu-item').click(function()
        {
            return false;
        });

        self.menuContent.find('a').click(function()
        {
            self.menu.removeClass('menu-open').addClass('menu-close');
        });
        
        self.menuButton.click(function()
        {
            if (self.menu.hasClass('menu-open'))
            {
                self.menu.removeClass('menu-open').addClass('menu-close');
            }
            else
            {
                self.menu.removeClass('menu-close').addClass('menu-open');
            }
            return false;
        });

        self.menuBg.click(function()
        {
            self.menu.removeClass('menu-open').addClass('menu-close');
        });
        
        // self.menuContent.hover(function()
        // {
        //     self.menuContent.removeClass('menu-open');
        // });
    })
    .fail(function(jqXHR, errorMessage)
    {
        console.log('Erreur : '+errorMessage);
    });
    
    
};

//Méthode permettant de récupérer et de filter le flux RSS d'une rubrique
RssReader.prototype.getChannel = function()
{
    var self = this;
    this.pageTitle.html(this.loadingMessage);
    this.paperBox.html('<div id="spinner"><i class="fa fa-refresh fa-spin"></i></div>');
    $.ajax(
    {
        url: self.xmlUrl,
        type: 'GET',
        cache: false,
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
            var sourceUrl = $(this).find('source').attr('url');
            var imgUrl =  $(this).find('media\\:content, content').attr('url');
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
    this.pageTitle.html('<a href="'+this.url+'" target="_blank">'+this.title+'</a>');
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
                    .css('background-image','url("'+this.imgUrl+'")')
                    .css('background-repeat', 'no-repeat')
                    .css('background-size', 'cover')
                    .css('background-position', 'center');
    
    var link =      $(document.createElement('div'))
                    .addClass('paper-link')
                    .html('<a href="'+this.url+'" target="_blank">Voir l\'article</a>');
    
    var right =     $(document.createElement('div'))
                    .addClass('paper-right');

    var title =     $(document.createElement('div'))
                    .addClass('paper-title')
                    .html('<a href="'+this.url+'" target="_blank">'+this.title+'</a>');
    
    var date =   $(document.createElement('div'))
                    .addClass('paper-date')
                    .html(this.getDateString()); 
    
    var content =   $(document.createElement('div'))
                    .addClass('paper-content')
                    .html(this.description); 
            
    var source =    $(document.createElement('div'))
                    .addClass('paper-source')
                    .html('Source : <a href="'+this.sourceUrl+'" target="_blank">'+this.source+'</a>'); 
    
    var clear =     $(document.createElement('div'))
                    .addClass('clear');

    left            .append(image)
                    .append(link);
    
    right           .append(title)
                    .append(date)
                    .append(content)
                    .append(source)

    paper           .append(hidden)
                    .append(left)
                    .append(right)
                    .append(clear);
            
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
