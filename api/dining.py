import requests
from datetime import datetime

def getMenu(diningHall):
    baseurl = "https://api.ucsb.edu/dining/menu/v1/"  # base url for menu calls

    timeInfo = datetime.now()  # gain time info
    date = str(timeInfo).split(" ")[0]
    hour = timeInfo.hour

    url = baseurl + str(date) + '/'  # add in the date

    url += diningHall + '/'  # add the dining hall

    # find time of day and add accordingly
    if 10 < hour < 15:
        url += "Lunch"
    elif 15 <= hour <= 21:
        url += "Dinner"
    else:
        url += "Breakfast"

    headers = {'ucsb-api-key': ''}  # header to pass in api key

    r = requests.get(url, headers=headers)  # getting request
    ret = r.json()

    return ret
