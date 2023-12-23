import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import time
mongo_uri = "mongodb+srv://cloudsoftware:V96t8Je.p_ra.Gg@cloudsoftware.gld5yf5.mongodb.net"
client = MongoClient(mongo_uri)
db = client['cloudsoftware']
collection = db['poste']
offsets = ['1', '2']
url = 'https://www.poste.tn/codes_ajax.php'
postal_code_patterns = [pattern.replace('**', f'{i:02}') for pattern in ['20**', '90**', '11**', '70**', '60**', '21**', '81**', '31**', '12**', '42**',
                        '71**', '51**', '41**', '50**', '80**', '30**', '91**', '61**', '40**', '32**', '22**'] for i in range(100)]

# Iterate over all patterns
for pattern in postal_code_patterns:
    # Iterate over offset values 1 and 2
    for offset in [1, 2]:
        url = 'https://www.poste.tn/codes_ajax.php'
        payload = {
            'motcle': pattern,
            'do': 'search',
            'offset': offset
        }

        try:
            response = requests.post(url, data=payload, verify=False)
            response.raise_for_status()

            # Extract data from HTML using BeautifulSoup
            soup = BeautifulSoup(response.text, 'html.parser')
            data_table = soup.find('table', {'class': 'tab'})
            
            data = []
            for row in data_table.find_all('tr', bgcolor=["#FFFFFF", "#F4F4F4"]):
                columns = row.find_all('td', class_='txtnoir11px')
                locality, delegation, place, postal_code = [col.get_text(strip=True) for col in columns]
                data.append({
                    'Gouvernorat': locality,
                    'Délégation': delegation,
                    'Localité': place,
                    'Code Postal': postal_code
                })

            

            if data:
                collection.insert_many(data)
                print(f'Successfully inserted {len(data)} documents into MongoDB collection for offset {offset}.')
            else:
                print(f'No data to insert for offset {offset}.')

            
            print(f'Response JSON for Pattern {pattern} with Offset {offset}:', json_data)
            time.sleep(500)
        except requests.exceptions.RequestException as err:
            print(f'Error for Pattern {pattern} with Offset {offset}:', err)
client.close()