<?php
/**
 * Description of Rss
 *
 * @author Thibault Goehringer
 */

namespace Src;

class Rss
{
    const DEF_HEADER = 'Xml-type: text/xml ; charset=utf-8';
    const MAX_TRIES = 10;
    
    private $sourceUrl;
    private $header;
    private $xml;
    
    function __construct($sourceUrl, $header = self::DEF_HEADER)
    {
        $this->setSourceUrl($sourceUrl);
        $this->setHeader($header);
    }
    
    function getXmlFile()
    {
        header($this->getHeader());
        echo $this->getXML()->asXml();
    }
    
    function retrieveXml()
    {
        libxml_use_internal_errors(true);
        $tries = 0;
        do
        {
            $string = file_get_contents($this->getSourceUrl());
            $xml = simplexml_load_string($string);
        }
        while($xml === false && $tries <= self::MAX_TRIES);
        
        $this->setXml($xml);
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

    function getXml()
    {
        return $this->xml;
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

    function setXml(\SimpleXMLElement $xml)
    {
        $this->xml = $xml;
        return $this;
    }
}
