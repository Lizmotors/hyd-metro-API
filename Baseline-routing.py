#!/usr/bin/env python3

import os
import sys

# list of links from a station to one of its neighbor
links = [ ['b1', 'b2', 5],
          ['b2', 'b1', 5],
          ['b2', 'b3', 6],
          ['b3', 'b2', 6],
          ['b3', 'b4', 4],
          ['b4', 'b3', 4],
          ['b2', 'r2', 2],
          ['r2', 'b2', 2],
          ['r2', 'b3', 3],
          ['b3', 'r2', 3]
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
    sys.exit( -1)
  for i,path in enumerate(paths):
    dist = calc_distance(path)
    print(f'{i+1}/{len(paths)}: {dist} "{path}"')

  sys.exit(0)
