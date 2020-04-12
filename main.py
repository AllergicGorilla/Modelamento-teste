import coronasim, json

def main():
    pop = coronasim.Population(10)
    obj = pop.simulate(10)
    print(json.dumps(obj))

if __name__ == '__main__':
    main()
