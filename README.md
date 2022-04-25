# Ethereum Twitter Analysis

# Overview

This doc is a step-by-step guide for Twitter analysis based on ENS names.

**sample output**
![output](https://im2.ezgif.com/tmp/ezgif-2-d564d71ac2.gif)

## Steps

There are 2 foundational steps for working with the ENS api and Twitter api at the same time.

The **examples** section includes the other things that you can do with the data.

### Step-1: Find the data

You should have a csv dataset that has a column on it that has the information of the ens names.

<aside>
💡 Notice: NO VALUE should remain empty. In pandas, you can use `pd.dropna(inplace=True)` to make sure in every row, there’s a real ENS name NO NAN VALUES

</aside>

You can leave out all the other columns in your dataframe. Just make sure that the ENS column exists. That’s all!

If you’ve been working with pandas to make your dataset, you can use `pd.to_csv(path=path)` and give it a name.

**example**

```jsx
pd.to_csv("whales.csv")
```

### Step-2: Talk to ENS

In the ENS website, everyone can link their social accounts to their `.eth` names. ENS has provided a library for us to find this data programmatically. Unfortunately, the only way to access this functionality is through Javascript. Though you don’t have to know anything about Javascript to do this, the function is already written for you! You only need to run it. So please make sure you have Node.js installed on your machine. I highly recommend the LTS version.

-   If you don’t know js, toggle this
    Once you’ve got your node.js setup, make sure you run a simple hello world program in javacript just to see if it works the way you expect.
    ```jsx
    console.log("hello world")
    ```
    and then run in your terminal
    ```jsx
    node hello.js // Or whatever your filename was
    ```

Now `cd` to the directory and run `npm install` to get all the packages you need

So I told you I’ve done the hard part right? You only need to follow the code gist and checklist here:

-   [ ] Make sure you have an ethereum node api key, You can use Alchemy or Infura. It has to be mainnet

Importing ethers has already been done, just initialize this provider.

```jsx
const provider = new ethers.providers.JsonRpcProvider(
   YOUR API KEY
// ie  "https://mainnet.infura.io/v3/12345"
)
```

-   [ ] Run this function with the following arguments

The function is the only thing you need to call to get the data you need. Here’s the signature of the function:

```tsx
async function getTwitterHandles(
    provider: Provider,
    csv: string,
    outputPath: string,
    ensColName: string
)
```

you don’t need to worry about `async` if you don’t know the word though:)

The most important part is what each of the parameters are:

-   `provider`: The ethers.js provider we made in our first checkmark!
-   `csv`: The csv **relative** path to your csv file you exported in [the first step](https://www.notion.so/Twitter-Analysis-b6d0591ef02c4b0d9d3755ae5d83437f)
-   `outputPath`: The path of the output, I haven’t tried with a different directory than the `cwd`itself. If you’re on linux, it might not be able to save the output to a different directory because of permissions. Note: all the files are prefixed by a `.txt` in the end, this is a convention in the function’s code
-   `ensColName`: Remember the dataset you exported in the first step? This functions needs only one column and that is the ensColName. You provide the name of the column that contains the ENS values. The function doesn’t care about the rest honestly.

run the file you have made using node after providing the arguments. Below is a sample argument.

```tsx
getTwitterHandles(provider, "./whales.csv", "./whales", "ENS")
```

That’s it! You now have it setup _blazingly fast._ Just a quick note, the function will log everytime it tries to fetch an ENS name’s twitter. For every ENS name, there are two logs:

One that says `fetching example.eth`

other says `fetched example.eth`

**my terminal has been frozen...**

please make sure to check the logs every few minutes, if the logs have frozen and nothing is being updated, it’s a sign that it’s reached the end. You can check the txt file of the output (spoiler: you’ll see a bunch of NaN values) and safely `CTRL+C`to stop node from executing the program if it doesn’t stop on finish time.

### The finish line 🏁

That’s it. Now you have the output file. One quick note before you go and explore. The program _attempts_ to find the twitter usr name out the ens user. If it can’t find it, it’ll write a `'NaN'`string value. This is different from `np.nan` or `undefiend`in js land.

I recommend you to have a filter that checks strict equality (ie `==` if you’re in python, `===` if you’re in js) to check for equality with ‘NaN’ strings.

However, if it can find it, the output will be:

```tsx
ensName++TwitterUsername
```

and example of this is:

```tsx
lossy.eth++lossyeth
```
