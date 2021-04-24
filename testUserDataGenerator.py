import random
import json

data = []
for i in range(1, 31):
    dict = {}
    dict["username"] = "user" + str(i)
    dict["password"] = "pw" + str(i)
    dict["totalMeals"] = random.choice([0, 420])
    if dict["totalMeals"] == 0:
        dict["totalPoints"] = 1980
        dict["remainingMeals"] = 0
        dict["remainingPoints"] = random.randint(0,700)
        dict["transactions"] = []
        for j in range(30):
            dict["transactions"].append({"Meals": 0, "Points": random.randint(10,35)})
    else:
        dict["totalPoints"] = 250
        dict["remainingMeals"] = random.randint(30, 260)
        dict["remainingPoints"] = random.randint(0,120)
        dict["transactions"] = []
        for j in range(30):
            dict["transactions"].append({"Meals": random.choice([0,1,1,2,2,2,2,3,3,3,4]), "Points": random.choice([0,0,0,0,0,0,random.choice([0,8,12,15,20,25,30])])})
    data.append(dict)

f = open("testUsersJson.json", "w")
for i in data:
    print(i)
    print('\n')
f.write(json.dumps(data))
f.close()
