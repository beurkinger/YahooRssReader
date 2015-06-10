<?php
/**
 * Description of Rss
 *
 * @author Thibault Goehringer
 */

namespace Src;

class Rss
{
    const DEF_HEADER = 'Content-type: text/xml ; charset=utf-8';
    
    private $sourceUrl;
    private $header;
    private $content;
    
    function __construct($sourceUrl, $content = '', $header = self::DEF_HEADER)
    {
        $this->setSourceUrl($sourceUrl);
        $this->setHeader($header);
        $this->setContent($content);
    }
    
    function getXML()
    {
        $xml = new \SimpleXMLElement($this->getContent());
        header($this->getHeader());
        echo $xml->asXml();
    }
    
    function retrieveContent()
    {
        $this->setContent(file_get_contents($this->getSourceUrl()));
        return $this;
    }
    
    function getSourceUrl()
    {
        return $this->sourceUrl;
    }

    function getHeader()
    {
        return $this->header;
    }

    function getContent()
    {
        return $this->content;
    }

    function setSourceUrl($sourceUrl)
    {
        $this->sourceUrl = (string) $sourceUrl;
        return $this;
    }

    function setHeader($header)
    {
        $this->header = (string) $header;
        return $this;
    }

    function setContent($content)
    {
        $this->content = (string) $content;
        return $this;
    }
}
