from bs4 import BeautifulSoup

soup = BeautifulSoup(open("interests.html"))
#for href in soup.findAll('a'):
	
	#write professors
	#professors = open('professors.txt','a')
	#tag = href.find(text=True)
	#professors.write(str(tag.next.next))
	#professors.close()
	
	#write links
	#links = open ('links.txt','a')
	#link = str(href)
	#links.write('http://www.scrb.harvard.edu/faculty' + link[link.find('"')+1:link.rfind('"')] + '\n')
	

for string in soup('div'):
	topics = open('topics.txt','a')
	topics.write(string.find_next(text=True).rstrip())
	topics.close()


