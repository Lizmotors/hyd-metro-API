#!/usr/bin/env python3

import os
import sys

# list of links from a station to one of its neighbor
links = [ ['Nagole','Uppal',10],
          ['Uppal','Stadium',10],
          ['Stadium','NGRI',12],
          ['NGRI','Habsiguda',8],
          ['Habsiguda','Tarnaka',14],
          ['Tarnaka','Mettuguda',14],
          ['Mettuguda','Secunderabad',18],
          ['Secunderabad','Parade Grounds',16],
          ['Parade Grounds','Paradise',12],
          ['Paradise','Rasool Pura',10],
          ['Rasool Pura','Prakash Nagar',11],
          ['Prakash Nagar','Begumpet',14],
          ['Begumpet','Ameerpet',15],
          ['Ameerpet','Madhura Nagar',7],
          ['Madhura Nagar','Yusuf Guda',14],
          ['Yusuf Guda','Jubilee Hills Road No 5',8],
          ['Jubilee Hills Road No 5','Jubilee Hills Check Post',12],
          ['Jubilee Hills Check Post','Pedamma Temple',6],
          ['Pedamma Temple','Madhapur',12],
          ['Madhapur,Durgam', 'Chervu',16],
          ['Durgam Chervu','HITEC City',8],
          ['HITEC City','Raidurg',15],
          ['Uppal','Nagole',10],
          ['Stadium','Uppal',10],
          ['NGRI','Stadium',12],
          ['Habsiguda','NGRI',8],
          ['Tarnaka','Habsiguda',14],
          ['Mettuguda','Tarnaka',14],
          ['Secunderabad','Mettuguda',18],
          ['Parade Grounds','Secunderabad',16],
          ['Paradise','Parade Grounds',12],
          ['Rasool Pura','Paradise',10],
          ['Prakash Nagar','Rasool Pura',11],
          ['Begumpet','Prakash Nagar',14],
          ['Ameerpet','Begumpet',15],
          ['Madhura Nagar','Ameerpet',7],
          ['Yusuf Guda','Madhura Nagar',14],
          ['Jubilee Hills Road No 5','Yusuf Guda',8],
          ['Jubilee Hills Check Post','Jubilee Hills Road No 5',12],
          ['Pedamma Temple','Jubilee Hills Check Post',6],
          ['Madhapur','Pedamma Temple',12],
          ['Durgam Chervu','Madhapur',16],
          ['HITEC City','Durgam Chervu',8],
          ['Raidurg','HITEC City',15],
          ['L B Nagar','Victoria Memorial',14],
          ['Victoria Memorial','Chaitanyapuri',10],
          ['Chaitanyapuri','Dilsukhnagar',14],
          ['Dilsukhnagar','Musarambagh',15],
          ['Musarambagh','New Market',10],
          ['New Market','Malakpet',11],
          ['Malakpet','MG Bus station',10],
          ['MG Bus station','Osmania Medical College',6],
['Osmania Medical College','Gandhi Bhavan',10],
['Gandhi Bhavan','Nampally',8],
['Nampally','Assembly',7],
['Assembly','Lakdikapul',10],
['Lakdikapul','Khairatabad',10],
['Khairatabad','Irrum Manzil',10],
['Irrum Manzil','Punjagutta',11],
['Punjagutta','Ameerpet',10],
['Ameerpet','S R Nagar',10],
['S R Nagar','ESI Hospital',7],
['ESI Hospital','Erragadda Road',10],
['Erragadda Road','Bharat Nagar',7],
['Bharat Nagar','Moosapet',11],
['Moosapet','Balanagar',7],
['Balanagar','Kukatpally',14],
['Kukatpally','KPHB Colony',14],
['KPHB Colony','JNTU College',15],
['JNTU College','Miyapur',17],
['Victoria Memorial','L B Nagar',14],
['Chaitanyapuri','Victoria Memorial',10],
['Dilsukhnagar','Chaitanyapuri',14],
['Musarambagh','Dilsukhnagar',15],
['New Market','Musarambagh',10],
['Malakpet','New Market',11],
['MG Bus station','Malakpet',10],
['Osmania Medical College','MG Bus station',6],
['Gandhi Bhavan','Osmania Medical College',10],
['Nampally','Gandhi Bhavan',8],
['Assembly','Nampally',7],
['Lakdikapul','Assembly',10],
['Khairatabad','Lakdikapul',10],
['Irrum Manzil','Khairatabad',10],
['Punjagutta','Irrum Manzil',11],
['Ameerpet','Punjagutta',10],
['S R Nagar','Ameerpet',10],
['ESI Hospital','S R Nagar',7],
['Erragadda Road','ESI Hospital',10],
['Bharat Nagar','Erragadda Road',7],
['Moosapet','Bharat Nagar',11],
['Balanagar','Moosapet',7],
['Kukatpally','Balanagar',14],
['KPHB Colony','Kukatpally',14],
['JNTU College','KPHB Colony',15],
['Miyapur','JNTU College',17],

['JBS','Parade Grounds',5],
['Parade Grounds','Secunderabad',13],
['Secunderabad','Gandhi Hospital',13],
['Gandhi Hospital','Musheerabad',10],
['Musheerabad','RTC Cross Roads',13],
['RTC Cross Roads','Chikkadpally',8],
['Chikkadpally','Narayanguda',9],
['Narayanguda','Sultan Bazar',13],
['Sultan Bazar','M G Bus Station',7],
['Parade Grounds','JBS',5],
['Secunderabad','Parade Grounds',13],
['Gandhi Hospital','Secunderabad',13],
['Musheerabad','Gandhi Hospital',10],
['RTC Cross Roads','Musheerabad',13],
['Chikkadpally','RTC Cross Roads',8],
['Narayanguda','Chikkadpally',9],
['Sultan Bazar','Narayanguda',13],
['M G Bus Station','Sultan Bazar',7],
 ]


def is_valid(path):
  """
  valid paths do not back track or contain loops
  (links only appear once)
  """
  # no going back
  if len(path) >= 2:
    if path[-1][1] == path[-2][0]:
      return False
  for link in path:
    if path.count(link) > 1:
      return False
  return True


def all_paths(orig, dest):
  """
  Returns all possible paths from orig to dest
  each path is as list of links
  """
  if orig == dest:
    return None
  paths = []
  # get all origins and destination
  s0 = [x for x in links if x[0] == orig]
  if not s0:
    return None
  s1 = [x for x in links if x[1] == dest]
  if not s1:
    return None

  # each link that starts with our origin is a potential path to explore
  to_visit = [ [x,] for x in s0]

  while len(to_visit) > 0:
    path = to_visit.pop()
    # print(f'examining path "{path}"')
    path_end = path[-1][1] # ori, dest, dist
    previous_station = path[-1][0]
    if path_end == dest:
      paths.append(path)
    else:
      sn = [x for x in links if x[0] == path_end]
      for link in sn:
          new_path = path.copy()
          new_path.append(link)
          if is_valid(new_path):
            # print(f'new path {new_path}')
            to_visit.append(new_path)

  return paths

def calc_distance(path):
  """
  Sums up the distances of all links in a path
  """
  total = 0
  for link in path:
    total += link[2]
  return total


if __name__ == "__main__":
  import argparse
  parser = argparse.ArgumentParser(description='Metro paths')
  parser.add_argument('origin', type=str)
  parser.add_argument('destination', type=str)
  args = parser.parse_args()

  print(f'''paths from "{args.origin}" to "{args.destination}"''')

  paths = all_paths(args.origin, args.destination)
  if not paths:
    print(f'no path between "{args.origin}" and "{args.destination}"')
    print('\n')
    sys.exit( -1)
  for i,path in enumerate(paths):
    dist = calc_distance(path)
    print(f'{i+1}/{len(paths)}: {dist/10} km "{path}"')

  sys.exit(0)
