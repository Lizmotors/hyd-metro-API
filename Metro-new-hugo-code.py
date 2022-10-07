#!/usr/bin/env python3

#Runing instruction ./Metro-new-hugo-code.py Hyderabad-Metro-line.json Musheerabad Moosapet 

import os
import sys
import json


def read_map(filepath):
  links = []
  with open(filepath, 'r') as f:
    links = json.load(f)
  return links

def is_valid(path):
  """
  valid paths do not back track or contain loops
  (links only appear once)
  """
  # going back to the previous station is not allowed
  if len(path) >= 2:
    if path[-1]["destination"] == path[-2]["source"]:
      return False
  for link in path:
    if path.count(link) > 1:
      return False
  return True


def all_paths(links, orig, dest):
  """
  Returns all possible paths from orig to dest
  each path is as list of links
  """
  if orig == dest:
    return None
  paths = []
  # get all origins and destination
  s0 = [x for x in links if x["source"] == orig]
  if not s0:
    return None
  s1 = [x for x in links if x["destination"] == dest]
  if not s1:
    return None

  # each link that starts with our origin is a potential path to explore
  to_visit = [ [x,] for x in s0]

  while len(to_visit) > 0:
    path = to_visit.pop()
    # print(f'examining path "{path}"')
    path_end = path[-1]["destination"] # ori, dest, dist
    # Check if this path ends with the desired destination
    if path_end == dest:
      paths.append(path)
    else:
      sn = [x for x in links if x["source"] == path_end]
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
  total_distance = 0
  total_time = 0
  line_changes = 0

  line = path[0]["Line"]
  for link in path:
    total_distance += link["distance"]
    total_time += link["Time"]
    if line != link["Line"]:
      line_changes += 1
      line = link["Line"]
  total_distance = total_distance
  total_time = total_time
  return {"distance": total_distance / 10,
          "time": total_time,
          "line_changes": line_changes}

def print_path(info, path):
    print(f'distance {info["distance"]} km')
    print(f'time {info["time"] / 60} min')
    print(f'line changes ({info["line_changes"]})')
    for i, link in enumerate(path):
      print(f'{i+1} {link["Line"]}  {link["source"]}')
    print(f'{i+2} {link["Line"]} {link["destination"]}')

if __name__ == "__main__":
  import argparse
  parser = argparse.ArgumentParser(description='Metro paths')
  parser.add_argument('stations', type=str, help="stations map json")
  parser.add_argument('origin', type=str, help="origin station name")
  parser.add_argument('destination', type=str, help="destination name")
  args = parser.parse_args()

  print(f'''compute all
    paths from "{args.origin}" to "{args.destination}"
    using map "{args.stations}"
  ''')
  links = read_map(args.stations)
  paths = all_paths(links, args.origin, args.destination)
  if not paths:
    print(f'no path between "{args.origin}" and "{args.destination}"')
    sys.exit( -1)
  for i,path in enumerate(paths):
    info = calc_distance(path)
    print(f"\n---- path {i+1}/{len(paths)} ------ ")
    print_path(info, path)
  sys.exit(0)
