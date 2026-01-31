<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:template match="/">
    <html>
      <head>
        <title>XML Sitemap - Lumina Premium</title>
        <style>
          body { font-family: 'Inter', sans-serif; background: #f4f7f9; color: #333; padding: 50px; }
          h1 { color: #0048ff; }
          table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          th { background: #0048ff; color: #fff; text-align: left; padding: 15px; }
          td { padding: 12px 15px; border-bottom: 1px solid #eee; }
          tr:hover { background: #f9f9f9; }
          a { color: #0048ff; text-decoration: none; }
          .priority { font-weight: bold; color: #2ecc71; }
        </style>
      </head>
      <body>
        <h1>Lumina Premium - Sitemap</h1>
        <p>This is an automated XML sitemap for SEO purposes.</p>
        <table>
          <tr>
            <th>URL</th>
            <th>Priority</th>
            <th>Last Modified</th>
          </tr>
          <xsl:for-each select="sitemap:urlset/sitemap:url">
            <tr>
              <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
              <td class="priority"><xsl:value-of select="sitemap:priority"/></td>
              <td><xsl:value-of select="sitemap:lastmod"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>