<?php
include 'Src/Rss.php';
use Src\Rss;

define('DEF_URL', 'https://fr.news.yahoo.com/?format=rss');
        
$url = (isset($_GET['url']) ? (string) $_GET['url'] : DEF_URL );
$rss = new Rss($url);
$rss->retrieveContent()->getXML();
