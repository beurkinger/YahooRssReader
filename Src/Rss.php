<?php
/**
 * Description of Rss
 *
 * @author Thibault Goehringer
 */

namespace src;

class Rss
{
    const DEF_HEADER = 'Xml-type: text/xml ; charset=utf-8';
    const MAX_NB_TRY = 10;

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
        $ctx = stream_context_create([
          'http' => [
            'timeout' => 1
          ]
        ]);
        do
        {
          try {
            $tries++;
            $string = file_get_contents($this->getSourceUrl(), 0, $ctx);
            $xml = simplexml_load_string($string);
          } catch (Exception $e) {
            $xml = false;
          }
        }
        while($xml === false && $tries <= self::MAX_NB_TRY);

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
