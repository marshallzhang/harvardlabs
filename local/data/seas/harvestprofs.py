html = open("homepage.txt","r")
profs = open("professors.txt","w")
link = 'href="/directory/'
for line in html:
	if link in line:
		start = line.find('a title="')
		end = line.find('" class=')
		prof = str(line[start+9:end])
		profs.write(prof + '\n')
	else:
		continue