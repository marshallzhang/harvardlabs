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
	
	# put data into temp.txt
	temppage = open("temp.txt","w")
	temppage.write(data)
	temppage.close()
	
	# open temppage to read
	temppage = open("temp.txt","r")
	
	tick = 0
	
	recruitment = open('recruitment.txt','a')
	recruitment.write('\n')
	
	# for each line, find recruitment status
	for line in temppage:
		if 'StudentBox' in line:
			tick = 1
			if 'StudentBoxGreen' in line:
				recruitment.write('y')
				print('y')
			else:
				recruitment.write('n')
				print('n')
				continue;
	if tick == 0:
		recruitment.write("\n")
	recruitment.close()
	
			
	