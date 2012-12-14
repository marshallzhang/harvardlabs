import urllib.request

urls = open("urls.txt","r")

# for each professor's page
for prof in urls:
	
	print(prof)
	
	# get full address of page
	url = "https://www.seas.harvard.edu/directory/" + prof
	
	# get site data
	page = urllib.request.urlopen(url)
	tempdata = page.read()
	data = tempdata.decode("utf8")
	if '<ul class="websitesList">' in data:
		links = open("links2.txt","a")
		start = data.find('<ul class="websitesList">') + 39
		tempend = data.rfind("</a></li>")
		end = int(start + (((tempend - start) / 2) - 2)) + 1
		link = data[start:end]
		links.write(link + '\n')
	else:
		links = open("links2.txt","a")
		links.write("\n")
		continue;
	links.close()
	