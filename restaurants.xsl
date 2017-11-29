<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="4.0" encoding="UTF-8"/>
	<xsl:template match="/">
		<html>
			<head>
				<title>Restaurants</title>
			</head>
			<body>
				<h1>Restaurants</h1>
				<table>
					<tr>
						<th>Name</th>
						<th>Anschrift</th>
						<th>Speisen</th>
					</tr>
					<xsl:apply-templates select="//Restaurant[@Plz >= 8000]"/>
				</table>
			</body>
		</html>
	</xsl:template>
	
	<xsl:template match="Restaurant">
		<tr>
			<td><xsl:value-of select="@Name"/></td>
			<td><xsl:value-of select="@Plz"/> - <xsl:value-of select="@Ort"/>, <xsl:value-of select="@Adresse"/></td>
			<td>
				<xsl:apply-templates select="Speisen"/>
			</td>
		</tr>
	</xsl:template>
	
	<xsl:template match="Speisen">
		<ul>
			<xsl:for-each select="Speise">
				<xsl:if test="position() &lt;= 3">
					<li><xsl:value-of select="@Name"/></li>
				</xsl:if>
			</xsl:for-each>
		</ul>
	</xsl:template>
</xsl:stylesheet>