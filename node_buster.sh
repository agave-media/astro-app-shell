# Path: apps/monch-api/lib/utils/node-buster.sh
# Delete all instances of node_modules, including subdirectories. Have option to list how many instances of node_modules are found.

# Usage: node-buster.sh [options]
# Options:
# -l, --list: list how many instances of node_modules are found
# -h, --help: display this help message

# Example: node-buster.sh -l

# Set default options
list=0

# Parse options
while [ "$1" != "" ]; do
    case $1 in
        -l | --list )           shift
                                list=1
                                ;;
        -h | --help )           shift
                                echo "Usage: node-buster.sh [options]"
                                echo "Options:"
                                echo "-l, --list: list how many instances of node_modules are found"
                                echo "-h, --help: display this help message"
                                exit
                                ;;
        * )                     echo "Usage: node-buster.sh [options]"
                                echo "Options:"
                                echo "-l, --list: list how many instances of node_modules are found"
                                echo "-h, --help: display this help message"
                                exit 1
    esac
    shift
done

# Find all instances of node_modules
node_modules=$(find . -name "node_modules" -type d)

# Find all instances of yarn.lock
yarn_lock=$(find . -name "yarn.lock" -type f)

# Count how many instances of node_modules are found
count=$(echo "$node_modules" | wc -l)

# List how many instances of node_modules are found
if [ $list -eq 1 ]; then
    echo "$count instances of node_modules found"
else
    # Delete all instances of node_modules
    echo "$node_modules" | xargs rm -rf

    # Delete all instances of yarn.lock
    echo "$yarn_lock" | xargs rm -f
fi
