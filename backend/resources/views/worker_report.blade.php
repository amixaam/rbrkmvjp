<!DOCTYPE html>
<html>
<head>
    <style>
    * {
    }
    table {
        width: 100%;
        border: 1px solid black;
    }
    
    th, td {
        border: 1px solid black;
        font-size: 0.75rem;
        text-align: center;
        max-width: 60px; /* Adjust as needed */
        overflow: hidden;
        text-overflow: ellipsis; /* Show ellipsis for overflowed text */
        white-space: nowrap;
    }
    
    .title {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .worker-info {
        margin: 0px;
        padding: 0px;
    }
</style>
</head>
<body>

    <div class="title">
        <h1>Worker Report</h1>
        @if($startDate && $endDate)
            <p>Date Range: {{ $startDate }} to {{ $endDate }}</p>
        @endif
    </div>

    <div class="worker-info">
        <h2>Worker Information</h2>
        <p>ID: {{ $workerData->id }}</p>
        <p>Username: {{ $workerData->username }}</p>
        <p>Email: {{ $workerData->email}}</p>
        <p>Role: {{ $workerData->role }}</p>
        <p>Created At: {{ $workerData->created_at }}</p>
    </div>

    <h2>Assigned Products - {{count($assignedProducts)}}</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Dest. Shelf</th>
                <th>Created At</th>
                <th>Delivered</th>
                <!-- Add more columns as needed -->
            </tr>
        </thead>
        <tbody>
            @foreach($assignedProducts as $product)
                <tr>
                    <td>{{ $product->id }}</td>
                    <td>{{ $product->name }}</td>
                    <td>{{ $product->category_name }}</td>
                    <td>{{ $product->quantity }}</td>
                    <td>{{ $product->destination_shelf_name }}</td>
                    <td>{{ $product->formatted_created_at }}</td>
                    <td>
                        @if($product->delivered == 0)
                            No
                        @elseif($product->delivered == 1)
                            Yes
                        @else
                            Unknown
                        @endif
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>
</html>
