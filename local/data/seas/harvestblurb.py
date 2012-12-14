from bs4 import BeautifulSoup

import urllib.request

urls = open("testurl.txt","r")

# for each page
for page in urls:
	soup = BeautifulSoup(page)
	woah = soup.findall("div",class_="biography").children
	print woah