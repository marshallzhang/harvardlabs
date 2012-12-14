from bs4 import BeautifulSoup

soup = BeautifulSoup(open("homepage.html"))
#for href in soup('a'):
	
	# write professors
	#professors = open('professors.txt','a')
	#professors.write(href.contents)
	#professors.close()
	
	#write links
	#links = open ('links.txt','a')
	#link = 'http://www.economics.harvard.edu' + href['href']
	#links.write(link + '\n')
	
for string in soup('b'):
	topics = open('topics.txt','a')
	topics.write(string.find_next(text=True).find_next(text=True) + '\n')
	topics.close()