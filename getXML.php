<?php
include 'Src/Rss.php';
use Src\Rss;

define('DEF_URL', 'https://fr.news.yahoo.com/?nf=1&format=rss');
        
$url = isset($_GET['url']) && !empty($_GET['url']) ? (string) $_GET['url'] : DEF_URL;
$rss = new Rss($url);
$rss->retrieveXml()->getXmlFile();
