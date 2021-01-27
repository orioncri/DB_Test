import os
import shutil
import logging
from doltpy.core import Dolt
from doltpy.core.system_helpers import get_logger

LOG_LEVEL = logging.FATAL
logger = logging.getLogger()
logger.setLevel(LOG_LEVEL)


def main():
    #cleanup()

    repo_path = "."
    repo = Dolt(repo_path)

    act_branch, branches = repo.branch()
    brn_cnt=len(branches)

    commits = list(repo.log().values())
    com_cnt=len(commits)
    print()

    answer = ''

    while answer != 'q':
        print("0 - List Branches")
        print("1 - List Commits")
        print("2 - Select Branch")
        print("3 - List Active Branch")
        print("q - Quit")
        answer = input("Select item : ")

        if answer == '0':
            for brn_id in range(0,brn_cnt):
                branchData = str(branches[brn_id]).split(":", 2)
                branchName = str(branchData[1]).split(",", 1)
                print (branchName[0])

        elif answer == '1':
            for com_id in range(0,com_cnt):
                com_data = str(commits[com_id]).split(":", 1)
                msg = com_data[1].split(" @ ", 1)
                print("commit_id: ", com_id, msg[1])

        elif answer == '2':
            myBranch = input("Branch Name : ")
            switch_branch(repo, myBranch)
            act_branch, branches = repo.branch()
            brn_cnt=len(branches)

        elif answer == '3':
            print()
            print("Active Branch:")
            print(act_branch)
            print()


def create_view(repo):
    repo.sql(query='''
        CREATE VIEW PersonView AS 
            select first_name,last_name,age,city.name from person JOIN city on person.city_id=city.id;
    ''', result_format="tabular")


def show_view_status(repo):
    print("Person View")
    repo.sql(query="SELECT * FROM PersonView", result_format="tabular")


def merge_branch(repo, branch_name, message):
    switch_branch(repo, "master")
    repo.merge(branch_name, message)


def switch_branch(repo, branch_name):
    repo.checkout(branch_name)


def remove_person(repo, table, condition):
    query = f"DELETE FROM {table} where {condition}"
    repo.sql(query=query, result_format="tabular")


def change_city(repo, column, before, after):
    query = f"UPDATE city SET {column} = '{after}' WHERE {column} ='{before}'"
    repo.sql(query=query, result_format="tabular")


def change_person(repo, column, before, after):
    query = f"UPDATE person SET {column} = '{after}' WHERE {column} ='{before}'"
    repo.sql(query=query, result_format="tabular")


def get_city_id_from_name(repo, city_name):
    query = f"SELECT id FROM city where name='{city_name}'"
    results = repo.sql(query, "json")
    city_id = results['rows'][0]['id']
    return city_id


def add_person(repo, first_name, last_name, age, city_name):
    city_id = get_city_id_from_name(repo, city_name)
    _add_person_with_id(repo, first_name, last_name, age, city_id)


def _add_person_with_id(repo, first_name, last_name, age, city_id):
    try:
        add_person.counter += 1
    except AttributeError:
        add_person.counter = 1
    query = f"INSERT INTO person VALUES ({add_person.counter}, '{first_name}', '{last_name}', '{age}', {city_id})"
    repo.sql(query=query, result_format="tabular")


def add_city(repo, city_name):
    try:
        add_city.counter += 1
    except AttributeError:
        add_city.counter = 1
    query = f"INSERT INTO city VALUES ({add_city.counter}, '{city_name}')"
    repo.sql(query=query, result_format="tabular")


def create_branch(repo, branch_name):
    repo.branch(branch_name)


def add_tables(repo):
    repo.add(['person', 'city', 'dolt_schemas'])


def commit(repo, message):
    add_tables(repo)
    repo.commit(message)
    show_view_status(repo)


def create_tables(repo):
    repo.sql(query='''
        CREATE TABLE city (
            id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
            name varchar(30) NULL
        );
    ''', result_format="tabular")

    repo.sql(query='''
        CREATE TABLE person (
            id int NOT NULL AUTO_INCREMENT,
            first_name varchar(50) NULL,
            last_name varchar(50) NULL,
            age int NULL,
            city_id int NULL,
            PRIMARY KEY (id)
        );
    ''', result_format="tabular")


def cleanup():
    try:
        shutil.rmtree('.dolt')
    except:
        pass


if __name__ == "__main__":
    main()
