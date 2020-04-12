import coronasim, json, sys

iterations = int(sys.argv[1])
people_num = int(sys.argv[2])
width = int(sys.argv[3])
height = int(sys.argv[4])
def main():
    pop = coronasim.Population(people_num)
    obj = pop.simulate(iterations)
    print(json.dumps(obj))

if __name__ == '__main__':
    main()
