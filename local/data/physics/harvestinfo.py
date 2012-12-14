import urllib.request
from bs4 import BeautifulSoup

urls = open("tempurls.txt","r")

# for each professor's page
for prof in urls:
	
	print(prof)
	
	# get site data
	page = urllib.request.urlopen(prof)
	tempdata = page.read()
	data = tempdata.decode("utf8")
	soup = BeautifulSoup(data)
	
	print(soup.div.strings)