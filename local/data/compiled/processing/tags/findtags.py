# create one liner of tags seperated by commas
f = open("rawtags.txt",'r')
o = open("temp.txt","w")
final = open("cleanedtags.txt","w")
for line in f:
	if ",, " in line:
		o.write(line.replace(",, ","\n")) 
o.close()

# make list
cleaned = open("temp.txt","r")
tags = [line for line in cleaned]
print tags

# get rid of duplicates
tags = list(set(tags))

tagslist = open("tags.txt","w")

for x in tags:
	tagslist.write(x)
tagslist.close()